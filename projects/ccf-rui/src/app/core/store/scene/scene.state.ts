import { Injectable, Injector } from '@angular/core';
import { Matrix4, toRadians, Vector3 } from '@math.gl/core';
import { Computed, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { NgxsOnInit, State } from '@ngxs/store';
import { AABB, Vec3 } from 'cannon-es';
import { SpatialEntityJsonLd, SpatialSceneNode } from 'ccf-body-ui';
import { filterNulls, flatten, innerMap, pluckUnique } from 'ccf-shared/rxjs-ext/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { ModelState, ViewSide } from '../model/model.state';
import { RegistrationState } from '../registration/registration.state';
import { VisibilityItem } from './../../models/visibility-item';
import { ReferenceDataState, ReferenceDataStateModel } from './../reference-data/reference-data.state';


/**
 * Scene state model
 */
export interface SceneStateModel {
  showCollisions: boolean;
}

/**
 * Same as strict equality `===` except that empty arrays are considered equal.
 *
 * @param array1 First array
 * @param array2 Second array
 * @returns True when the arrays are the same one or both are empty, otherwise false
 */
function emptyArrayEquals<T>(array1: readonly T[], array2: readonly T[]): boolean {
  return array1 === array2 || (array1.length === 0 && array2.length === 0);
}

function dbEquals(db1: ReferenceDataStateModel, db2: ReferenceDataStateModel): boolean {
  return db1.sceneNodeLookup === db2.sceneNodeLookup &&
    db1.simpleSceneNodeLookup === db2.simpleSceneNodeLookup &&
    db1.anatomicalStructures === db2.anatomicalStructures;
}

function getNodeBbox(model: SpatialSceneNode): AABB {
  const mat = new Matrix4(model.transformMatrix);
  const lowerBound = mat.transformAsPoint([-1, -1, -1], []);
  const upperBound = mat.transformAsPoint([1, 1, 1], []);
  return new AABB({
    lowerBound: new Vec3(...lowerBound.map((n, i) => Math.min(n, upperBound[i]))),
    upperBound: new Vec3(...upperBound.map((n, i) => Math.max(n, lowerBound[i])))
  });
}

type Vector3Convertible = readonly number[] | { x: number; y: number; z: number };

function getTransformMatrix(
  dims: Vector3Convertible,
  position: Vector3Convertible,
  rotation: Vector3Convertible,
  scale: Vector3Convertible,
  ...additionalRotations: Vector3Convertible[]
): Matrix4 {
  const sizeScaling = 1 / 1000;
  const dimsVec = new Vector3().from(dims).scale(-sizeScaling / 2);
  const positionVec = new Vector3().from(position).scale(sizeScaling).add(dimsVec);
  const rotationVec = toRadians(new Vector3().from(rotation));
  const scaleVec = new Vector3().from(scale).scale(sizeScaling / 2);
  let transformMatrix = new Matrix4()
    .translate(positionVec)
    .rotateXYZ(rotationVec);

  for (const rot of additionalRotations) {
    const vec = toRadians(new Vector3().from(rot));
    transformMatrix = transformMatrix.rotateXYZ(vec);
  }

  return transformMatrix
    .scale(scaleVec);
}

/**
 * 3d Scene state
 */
@StateRepository()
@State<SceneStateModel>({
  name: 'scene',
  defaults: {
    showCollisions: !environment.production
  }
})
@Injectable()
export class SceneState extends NgxsImmutableDataRepository<SceneStateModel> implements NgxsOnInit {
  @Computed()
  get showCollisions$(): Observable<boolean> {
    return this.state$.pipe(pluckUnique('showCollisions'));
  }

  @Computed()
  get nodes$(): Observable<SpatialSceneNode[]> {
    const {
      placementCube$: cube$, referenceOrganNodes$: ref$,
      previousRegistrationNodes$: prev$, nodeCollisions$,
      showCollisions$
    } = this;

    const collision$ = showCollisions$.pipe(
      switchMap(show => show ? nodeCollisions$ : of([])),
      distinctUntilChanged(emptyArrayEquals)
    );

    return combineLatest([cube$, ref$, prev$, collision$]).pipe(
      flatten(),
      shareReplay(1)
    );
  }

  @Computed()
  get rotatedNodes$(): Observable<SpatialSceneNode[]> {
    const { nodes$, rotation$ } = this;

    return rotation$.pipe(
      switchMap(degrees => {
        if (degrees === 0) {
          return nodes$;
        }

        const matrix = new Matrix4().rotateY(toRadians(degrees));
        return nodes$.pipe(
          innerMap(node => ({
            ...node,
            transformMatrix: matrix.clone().multiplyRight(node.transformMatrix)
          }))
        );
      }),
      shareReplay(1)
    );
  }

  /** Observable of spatial nodes */
  @Computed()
  get referenceOrganNodes$(): Observable<SpatialSceneNode[]> {
    const {
      model: { organIri$, anatomicalStructures$, extractionSites$ },
      referenceData: { state$: refDataState$ }
    } = this;
    const iri$ = organIri$.pipe(filterNulls());
    const item$ = combineLatest([anatomicalStructures$, extractionSites$]).pipe(flatten());
    const db$ = refDataState$.pipe(distinctUntilChanged(dbEquals));

    return combineLatest([iri$, item$, db$]).pipe(
      map(([iri, items, db]) => items.map(item => this.createSceneNodes(item, iri, db))),
      flatten(),
      map(nodes => this.rotateNodes(nodes)),
      shareReplay(1)
    );
  }

  @Computed()
  get referenceOrganSimpleNodes$(): Observable<SpatialSceneNode[]> {
    const {
      model: { organIri$, anatomicalStructures$ },
      referenceData: { state$: refDataState$ }
    } = this;
    const iri$ = organIri$.pipe(filterNulls());
    const db$ = refDataState$.pipe(distinctUntilChanged(dbEquals));

    return combineLatest([iri$, anatomicalStructures$, db$]).pipe(
      map(([iri, structs, db]) => structs.map(
        struct => this.createSceneNodes(struct, iri, db, 'simple')
      )),
      flatten(),
      map(nodes => this.rotateNodes(nodes)),
      shareReplay(1)
    );
  }

  @Computed()
  get nodeCollisions$(): Observable<SpatialSceneNode[]> {
    const { placementCube$: cube$, referenceOrganSimpleNodes$: node$ } = this;
    return combineLatest([cube$, node$]).pipe(
      map(([cube, nodes]) => {
        if (cube.length === 0) {
          return [];
        }

        const bbox = getNodeBbox(cube[0]);
        return nodes.filter(node => bbox.overlaps(getNodeBbox(node)));
      }),
      distinctUntilChanged(emptyArrayEquals),
      shareReplay(1)
    );
  }

  @Computed()
  get previousRegistrationNodes$(): Observable<SpatialSceneNode[]> {
    const {
      model: { organIri$, showPrevious$, organDimensions$ },
      registration: { previousRegistrations$ }
    } = this;
    const iri$ = organIri$.pipe(filterNulls());
    const getTarget = ({ placement }: SpatialEntityJsonLd) =>
      (Array.isArray(placement) ? placement[0] : placement).target;

    return combineLatest([iri$, organDimensions$, showPrevious$, previousRegistrations$]).pipe(
      map(([iri, dims, show, previous]) => {
        if (!show) {
          return [];
        }

        return (previous as SpatialEntityJsonLd[])
          .filter(entity => getTarget(entity) === iri)
          .map(entity => this.createSceneNodeFromSpatialEntity(entity, dims));
      }),
      distinctUntilChanged(emptyArrayEquals),
      map(nodes => this.rotateNodes(nodes)),
      shareReplay(1)
    );
  }

  @Computed()
  get placementCube$(): Observable<SpatialSceneNode[]> {
    const { model: { organ$, blockSize$, position$, rotation$, viewType$ } } = this;
    return combineLatest([organ$, blockSize$, position$, rotation$, viewType$]).pipe(
      pluck(0, 'src'),
      map(src => src === '' ? [] : [this.placementCube]),
      distinctUntilChanged(emptyArrayEquals),
      shareReplay(1)
    );
  }

  @Computed()
  get placementCube(): SpatialSceneNode {
    const { organ, blockSize, rotation, position, organDimensions, viewType } = this.model.snapshot;
    const transformMatrix = getTransformMatrix(
      organDimensions, position, rotation, blockSize, organ.rotation ?? Vector3.ZERO
    );

    return {
      '@id': '#DraftPlacement',
      '@type': 'SpatialSceneNode',
      tooltip: 'Draft Placement',
      color: [255, 255, 0, 200],
      unpickable: viewType === '3d',
      transformMatrix,
    };
  }


  @Computed()
  get rotation$(): Observable<number> {
    const viewSideToRotationDegreesMap: Record<ViewSide, number> = {
      anterior: 0,
      left: -90,
      right: 90,
      posterior: 180
    };

    return this.model.viewSide$.pipe(
      map(side => viewSideToRotationDegreesMap[side] ?? 0)
    );
  }

  @Computed()
  get gizmo$(): Observable<SpatialSceneNode[]> {
    // const { model: { organ$ } } = this;
    // return organ$.pipe(
    //   pluckUnique('rotation'),
    //   map(rotation => rotation as [number, number, number] ?? [0, 0, 0]),
    //   map(rotation => toRadians(rotation)),
    //   map(rotation => [{
    //     '@id': 'http://purl.org/ccf/latest/ccf.owl#VHMaleOrgans_VHM_Spleen_Colic_Surface',
    //     '@type': 'SpatialSceneNode',
    //     scenegraph: 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/Assets/body4Mesh_1338.glb',
    //     transformMatrix: new Matrix4().scale([2, 2, 2]).rotateXYZ(rotation),
    //     tooltip: 'Gizmo',
    //     unpickable: true,
    //     _lighting: 'pbr',
    //     zoomBasedOpacity: false,
    //     color: [255, 255, 255, 255],
    //     opacity: 1
    //   } as SpatialSceneNode]),
    //   shareReplay(1)
    // );

    return of([
      {
        '@id': 'http://purl.org/ccf/latest/ccf.owl#VHMaleOrgans_VHM_Spleen_Colic_Surface',
        '@type': 'SpatialSceneNode',
        scenegraph: 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/Assets/body4Mesh_1338.glb',
        transformMatrix: new Matrix4().scale([2, 2, 2]).rotateY(toRadians(0)),
        tooltip: 'Gizmo',
        unpickable: true,
        _lighting: 'pbr',
        zoomBasedOpacity: false,
        color: [255, 255, 255, 255],
        opacity: 1
      }
    ]);
  }

  /** Reference to the reference data state */
  private registration: RegistrationState;


  /**
   * Creates an instance of scene state.
   *
   * @param injector Injector service used to lazy load states
   */
  constructor(
    private readonly model: ModelState,
    private readonly referenceData: ReferenceDataState,
    private readonly injector: Injector
  ) {
    super();
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    // Lazy load to break circular dependency
    this.registration = this.injector.get(RegistrationState);
  }

  private createSceneNodes(
    item: VisibilityItem, iri: string,
    db: ReferenceDataStateModel, nodeType: 'regular' | 'simple' = 'regular'
  ): SpatialSceneNode[] {
    const { id, opacity = 100 } = item;
    const opacityInPercentage = opacity / 100;
    const nodeLookupMap = nodeType === 'regular' ? db.sceneNodeLookup : db.simpleSceneNodeLookup;
    const createNode = (props: Partial<SpatialSceneNode>) => ({
      ...props,
      color: [255, 255, 255, 255],
      opacity: opacityInPercentage
    } as SpatialSceneNode);

    if (db.sceneNodeLookup[id]) {
      return [createNode(nodeLookupMap[id])];
    }

    const structs = db.anatomicalStructures[iri];
    if (structs) {
      return structs
        .filter(struct => struct.representation_of === id)
        .map(struct => createNode(nodeLookupMap[struct['@id']]));
    }

    return [];
  }

  private createSceneNodeFromSpatialEntity(
    entity: SpatialEntityJsonLd, dims: Vector3Convertible
  ): SpatialSceneNode {
    const {
      '@id': id, label, placement: placementOrArray,
      x_dimension: xDim, y_dimension: yDim, z_dimension: zDim
    } = entity;
    const {
      x_translation: xPos, y_translation: yPos, z_translation: zPos,
      x_rotation: xRot, y_rotation: yRot, z_rotation: zRot
    } = Array.isArray(placementOrArray) ? placementOrArray[0] : placementOrArray;
    const transformMatrix = getTransformMatrix(
      dims, [xPos, yPos, zPos], [xRot, yRot, zRot], [xDim, yDim, zDim]
    );

    return {
      '@id': id,
      '@type': 'SpatialSceneNode',
      tooltip: label,
      color: [25, 118, 210, 200],
      transformMatrix,
      unpickable: true
    };
  }

  private rotateNodes(nodes: SpatialSceneNode[]): SpatialSceneNode[] {
    const { model: { snapshot: { organ: { rotation } } } } = this;
    if (rotation === undefined) {
      return nodes;
    }

    const rotationInRadians = toRadians(rotation as [number, number, number]);
    const rotationMatrix = new Matrix4().rotateXYZ(rotationInRadians);
    return nodes.map(node => ({
      ...node,
      transformMatrix: new Matrix4(node.transformMatrix).multiplyLeft(rotationMatrix)
    }));
  }
}
