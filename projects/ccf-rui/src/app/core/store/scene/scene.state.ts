import { Injectable, Injector } from '@angular/core';
import { Computed, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsImmutableDataRepository } from '@ngxs-labs/data/repositories';
import { NgxsOnInit, State } from '@ngxs/store';
import { SpatialSceneNode } from 'ccf-body-ui';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { DataSourceService } from '../../services/data-source/data-source.service';
import { ModelState } from '../model/model.state';


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
    return this.model.organIri$.pipe(switchMap((iri) => this.lookupSceneNodes(iri)));
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

  /**
   * Looks up scene nodes associated with the reference organ
   *
   * @param iri reference organ iri
   */
  private lookupSceneNodes(iri: string): Observable<SpatialSceneNode[]> {
    return from(this.dataSourceService.getDB().then((db) => {
      const {anatomicalStructures, extractionSets, sceneNodeLookup} = db;
      const nodes = [
        anatomicalStructures[iri],
        ...extractionSets[iri].map(set => set.extractionSites)
      ].reduce((acc, n) => acc.concat(n), []);
      const scene = nodes.map(n => sceneNodeLookup[n['@id']]).filter(n => !!n);
      return scene;
    }));
  }
}
