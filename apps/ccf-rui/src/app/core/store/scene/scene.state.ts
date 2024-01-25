/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/naming-convention */
import { Computed, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsImmutableDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable, Injector } from '@angular/core';
import { Matrix4, toRadians } from '@math.gl/core';
import { NgxsOnInit, State } from '@ngxs/store';
import { AABB, Vec3 } from 'cannon-es';
import { SpatialEntityJsonLd, SpatialSceneNode } from 'ccf-body-ui';
import { SpatialEntity, SpatialPlacement, getOriginScene, getTissueBlockScene } from 'ccf-database';
import { Position } from 'ccf-shared';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ModelState } from '../model/model.state';
import { RegistrationState } from '../registration/registration.state';
import { VisibilityItem } from './../../models/visibility-item';
import { ReferenceDataState } from './../reference-data/reference-data.state';


/**
 * Scene state model
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SceneStateModel {
  showCollisions: boolean;
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
  get nodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([
      this.placementCube$, this.referenceOrganNodes$, this.previousRegistrationNodes$, this.nodeCollisions$, this.spatialKeyBoardAxis$
    ]).pipe(
      map(([placement, nodes, prevNodes, collisions, axis]) => [
        ...placement, ...prevNodes, ...nodes, ...axis, ...(this.snapshot.showCollisions ? collisions : [])
      ])
    );
  }

  @Computed()
  get rotatedNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.rotation$, this.nodes$]).pipe(
      map(([rotation, nodes]) => {
        if (rotation === 0) {
          return nodes;
        } else {
          return nodes.map(n => ({
            ...n,
            transformMatrix: new Matrix4(Matrix4.IDENTITY).rotateY(toRadians(rotation)).multiplyRight(n.transformMatrix)
          }));
        }
      })
    );
  }

  /** Observable of spatial nodes */
  @Computed()
  get referenceOrganNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.model.anatomicalStructures$, this.model.extractionSites$, this.model.organIri$]).pipe(
      map(([anatomicalStructures, extractionSites, organIri]) => {
        const organ = this.getOrganSpatialEntity(organIri as string);
        const originScene = organIri ? getOriginScene(organ, false, true) : [];
        const organScene = this.createSceneNodes(organIri as string, [...anatomicalStructures, ...extractionSites] as VisibilityItem[]);
        return [ ...originScene, ...organScene ];
      })
    );
  }

  @Computed()
  get referenceOrganSimpleNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.model.anatomicalStructures$, this.model.organIri$, this.referenceData.state$]).pipe(
      map(([anatomicalStructures, organIri, db]) =>
        anatomicalStructures
          // .filter(item => item.visible && item.opacity && item.opacity > 0)
          .map((item): SpatialSceneNode[] => {
            if (db.sceneNodeLookup[item.id]) {
              return [{
                ...(db.simpleSceneNodeLookup[item.id] as SpatialSceneNode),
                opacity: (item.opacity ?? 100) / 100,
                color: [255, 255, 255, 255]
              }];
            } else {
              return (db.anatomicalStructures[organIri as string] || [])
                .filter((node) => node.representation_of === item.id)
                .map((node): SpatialSceneNode => ({
                  ...(db.simpleSceneNodeLookup[node['@id']] as SpatialSceneNode),
                  opacity: (item.opacity ?? 100) / 100,
                  color: [255, 255, 255, 255]
                }));
            }
          })
          .reduce<SpatialSceneNode[]>((acc, nodes) => acc.concat(nodes), [])
      )
    );
  }

  @Computed()
  get nodeCollisions$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.referenceOrganSimpleNodes$, this.placementCube$]).pipe(
      filter(([_nodes, placement]) => placement.length > 0),
      map(([nodes, placement]) => {
        const bbox = getNodeBbox(placement[0]);
        return nodes.filter((model) => bbox.overlaps(getNodeBbox(model)));
      })
    );
  }

  @Computed()
  get previousRegistrationNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.model.organIri$, this.model.showPrevious$, this.registration.previousRegistrations$]).pipe(
      map(([organIri, showPrevious, previousRegistrations]) =>
        showPrevious ? previousRegistrations.map((entity: SpatialEntityJsonLd): SpatialSceneNode => {
          const p = Array.isArray(entity.placement) ? entity.placement[0] : entity.placement;
          if (p.target === organIri) {
            const organDimensions = this.model.snapshot.organDimensions;
            const dims = [organDimensions.x, organDimensions.y, organDimensions.z].map(n => -n / 1000 / 2);
            return {
              '@id': entity['@id'],
              '@type': 'SpatialSceneNode',
              transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([p.x_translation, p.y_translation, p.z_translation].map((n, i) => n / 1000 + dims[i]))
                .rotateXYZ([p.x_rotation, p.y_rotation, p.z_rotation].map<number>(toRadians) as [number, number, number])
                .scale([entity.x_dimension, entity.y_dimension, entity.z_dimension].map(n => n / 1000 / 2)),
              color: [25, 118, 210, 200],
              tooltip: entity.label,
              unpickable: true
            };
          } else {
            return undefined as unknown as SpatialSceneNode;
          }
        }).filter(e => !!e) : []
      )
    );
  }

  @Computed()
  get spatialKeyBoardAxis$(): Observable<SpatialSceneNode[]>{
    return combineLatest([this.model.organIri$.pipe(filter(organIri=>organIri!=='')), this.model.position$]).pipe(map(([organIri, position]: [string, Position]) => {
      const organEntity = this.getOrganSpatialEntity(organIri);
      const blockSize = this.model.snapshot.blockSize;
      const rotation = this.model.snapshot.rotation;
      return organEntity ? getTissueBlockScene({
        x_dimension: blockSize.x,
        y_dimension: blockSize.y,
        z_dimension: blockSize.z
      } as SpatialEntity, {
        x_translation: position.x - organEntity.x_dimension / 2,
        y_translation: position.y - organEntity.y_dimension / 2,
        z_translation: position.z - organEntity.z_dimension / 2,

        x_rotation: rotation.x,
        y_rotation: rotation.y,
        z_rotation: rotation.z,

        x_scaling: 1, y_scaling: 1, z_scaling: 1,
      } as SpatialPlacement): [];
    }));
  }

  @Computed()
  get placementCube$(): Observable<SpatialSceneNode[]> | [] {
    return combineLatest([this.model.viewType$, this.model.blockSize$, this.model.rotation$, this.model.position$, this.model.organ$]).pipe(
      map(([_viewType, _blockSize, _rotation, _position, organ]) => organ.src === '' ? [] : [this.placementCube])
    );
  }

  @Computed()
  get placementCube(): SpatialSceneNode {
    const { viewType, blockSize, rotation, position, organDimensions } = this.model.snapshot;
    const dims = [organDimensions.x, organDimensions.y, organDimensions.z].map(n => -n / 1000 / 2);
    return {
      '@id': '#DraftPlacement',
      '@type': 'SpatialSceneNode',
      transformMatrix: new Matrix4(Matrix4.IDENTITY)
        .translate([position.x, position.y, position.z].map((n, i) => n / 1000 + dims[i]))
        .rotateXYZ([rotation.x, rotation.y, rotation.z].map<number>(toRadians) as [number, number, number])
        .scale([blockSize.x, blockSize.y, blockSize.z].map(n => n / 1000 / 2)),
      color: [255, 255, 0, 200],
      tooltip: 'Draft Placement',
      unpickable: viewType === '3d',
    };
  }


  @Computed()
  get rotation$(): Observable<number> {
    return this.model.viewSide$.pipe(
      map((side) => {
        let rotation = 0;
        switch (side) {
          case 'left':
            rotation = -90;
            break;
          case 'right':
            rotation = 90;
            break;
          case 'posterior':
            rotation = 180;
            break;
          default:
            break;
        }
        return rotation;
      })
    );
  }

  readonly gizmo$: Observable<SpatialSceneNode[]> = of([
    {
      '@id': 'http://purl.org/ccf/latest/ccf.owl#VHMaleOrgans_VHM_Spleen_Colic_Surface',
      '@type': 'SpatialSceneNode',
      scenegraph: 'https://hubmapconsortium.github.io/ccf-3d-reference-object-library/Assets/body4Mesh_1338.glb',
      transformMatrix: new Matrix4(Matrix4.IDENTITY).scale([2, 2, 2]).rotateY(toRadians(0)),
      tooltip: 'Gizmo',
      unpickable: true,
      _lighting: 'pbr',
      zoomBasedOpacity: false,
      color: [255, 255, 255, 255],
      opacity: 1
    }
  ]);

  /** Reference to the model state */
  private model: ModelState;
  private registration: RegistrationState;
  private referenceData: ReferenceDataState;

  /**
   * Creates an instance of scene state.
   *
   * @param injector Injector service used to lazy load page and model state
   */
  constructor(
    private readonly injector: Injector
  ) {
    super();
  }

  /**
   * Initializes this state service.
   */
  ngxsOnInit(): void {
    super.ngxsOnInit();

    // Injecting page and model states in the constructor breaks things!?
    // Lazy load here
    this.model = this.injector.get(ModelState);
    this.registration = this.injector.get(RegistrationState);
    this.referenceData = this.injector.get(ReferenceDataState);
  }

  private createSceneNodes(organIri: string, items: VisibilityItem[]): SpatialSceneNode[] {
    const db = this.referenceData.snapshot;
    return items
      .filter(item => item.visible && item.opacity && item.opacity > 0)
      .map((item): SpatialSceneNode[] => {
        if (db.sceneNodeLookup[item.id]) {
          return [{
            ...(db.sceneNodeLookup[item.id] as SpatialSceneNode),
            opacity: (item.opacity ?? 100) / 100,
            color: [255, 255, 255, 255]
          }];
        } else {
          return (db.anatomicalStructures[organIri] || [])
            .filter((node) => node.representation_of === item.id)
            .map(node => ({
              ...(db.sceneNodeLookup[node['@id']] as SpatialSceneNode),
              opacity: (item.opacity ?? 100) / 100,
              color: [255, 255, 255, 255]
            }));
        }
      })
      .reduce((acc, nodes) => acc.concat(nodes), []);
  }

  private getOrganSpatialEntity(organIri: string): SpatialEntity {
    const db = this.referenceData.snapshot;
    return db.organSpatialEntities[organIri] as SpatialEntity;
  }


}
