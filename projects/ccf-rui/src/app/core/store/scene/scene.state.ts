import { RegistrationState } from './../registration/registration.state';
import { Injectable, Injector } from '@angular/core';
import { Matrix4, toRadians } from '@math.gl/core';
import { Computed, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { NgxsOnInit, State } from '@ngxs/store';
import { SpatialSceneNode, SpatialEntityJsonLd } from 'ccf-body-ui';
import { combineLatest, from, Observable, of } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

import { DataSourceService } from '../../services/data-source/data-source.service';
import { ModelState } from '../model/model.state';
import { VisibilityItem } from './../../models/visibility-item';


/**
 * Scene state model
 */
// tslint:disable-next-line: no-empty-interface
export interface SceneStateModel {
}


/**
 * 3d Scene state
 */
@StateRepository()
@State<SceneStateModel>({
  name: 'scene',
  defaults: {}
})
@Injectable()
export class SceneState extends NgxsImmutableDataRepository<SceneStateModel> implements NgxsOnInit {

  @Computed()
  get nodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.placementCube$, this.referenceOrganNodes$, this.previousRegistrationNodes$]).pipe(
      map(([placement, nodes, prevNodes]) => nodes.length > 0 ? [...placement, ...prevNodes, ...nodes] : [])
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
    return combineLatest([this.model.anatomicalStructures$, this.model.extractionSites$]).pipe(
      debounceTime(400),
      switchMap(([anatomicalStructures, extractionSites]) =>
        this.createSceneNodes([...anatomicalStructures, ...extractionSites] as VisibilityItem[])
      )
    );
  }

  @Computed()
  get previousRegistrationNodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.model.organIri$, this.model.showPrevious$, this.registration.previousRegistrations$]).pipe(
      map(([organIri, showPrevious, previousRegistrations]) =>
        showPrevious ? previousRegistrations.map((entity: SpatialEntityJsonLd) => {
          const p = Array.isArray(entity.placement) ? entity.placement[0] : entity.placement;
          console.log(entity);
          if (p.target === organIri) {
            return {
              '@id': entity['@id'],
              '@type': 'SpatialSceneNode',
              transformMatrix: new Matrix4(Matrix4.IDENTITY)
                .translate([p.x_translation, p.y_translation, p.z_translation].map(n => n / 1000))
                .rotateXYZ([p.x_rotation, p.y_rotation, p.z_rotation].map<number>(toRadians))
                .scale([entity.x_dimension, entity.y_dimension, entity.z_dimension].map(n => n / 1000)),
              color: [25, 118, 210, 200],
              tooltip: entity.label,
              unpickable: true
            } as SpatialSceneNode;
          } else {
            return undefined as unknown as SpatialSceneNode;
          }
        }).filter(e => !!e) : []
      )
    );
  }

  @Computed()
  get placementCube$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.model.viewType$, this.model.blockSize$, this.model.rotation$, this.model.position$]).pipe(
      map(([viewType, blockSize, rotation, position]) => [
        {
          '@id': '#DraftPlacement',
          '@type': 'SpatialSceneNode',
          transformMatrix: new Matrix4(Matrix4.IDENTITY)
            .translate([position.x, position.y, position.z].map(n => n / 1000))
            .rotateXYZ([rotation.x, rotation.y, rotation.z].map<number>(toRadians))
            .scale([blockSize.x, blockSize.y, blockSize.z].map(n => n / 1000)),
          color: [255, 255, 0, 200],
          tooltip: 'Draft Placement',
          unpickable: viewType === '3d',
        }
      ])
    );
  }


  @Computed()
  get rotation$(): Observable<number> {
    return this.model.viewSide$.pipe(
      map((side) => {
        let rotation = 0;
        switch(side) {
          case 'left':
            rotation = -90;
            break;
          case 'right':
            rotation = 90;
            break;
          case 'posterior':
            rotation = 180;
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

  /**
   * Creates an instance of scene state.
   *
   * @param injector Injector service used to lazy load page and model state
   * @param dataSourceService data access service
   */
  constructor(
    private readonly injector: Injector,
    private readonly dataSourceService: DataSourceService
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
  }

  private createSceneNodes(items: VisibilityItem[]): Observable<SpatialSceneNode[]> {
    return from(this.dataSourceService.getDB().then((db) => {
      return items
        .filter(item => item.visible && item.opacity && item.opacity > 0)
        .map(item => ({
          ...db.sceneNodeLookup[item.id],
          opacity: (item.opacity || 100) / 100,
          color: [255, 255, 255, 255]
        } as SpatialSceneNode));
    }));
  }
}
