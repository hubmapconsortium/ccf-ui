import { Injectable, Injector } from '@angular/core';
import { Computed, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { NgxsOnInit, State } from '@ngxs/store';
import { SpatialSceneNode } from 'ccf-body-ui';
import { combineLatest, from, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

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
          color: [255, 255, 255, (item.opacity || 100) / 100 * 255]
        } as SpatialSceneNode));
    }));
  }
}
