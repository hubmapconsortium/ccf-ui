import { Injectable, Injector } from '@angular/core';
import { Matrix4, toRadians } from '@math.gl/core';
import { Computed, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { NgxsOnInit, State } from '@ngxs/store';
import { SpatialSceneNode } from 'ccf-body-ui';
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
  /** Observable of spatial nodes */
  @Computed()
  get nodes$(): Observable<SpatialSceneNode[]> {
    return combineLatest([this.model.anatomicalStructures$, this.model.extractionSites$]).pipe(
      debounceTime(400),
      switchMap(([anatomicalStructures, extractionSites]) =>
        this.createSceneNodes([...anatomicalStructures, ...extractionSites] as VisibilityItem[])
      )
    );
  }

  @Computed()
  get rotation$(): Observable<number> {
    return combineLatest([this.model.viewType$, this.model.viewSide$]).pipe(
      map(([type, side]) => {
        let rotation = 0;
        if (type === 'register') {
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
