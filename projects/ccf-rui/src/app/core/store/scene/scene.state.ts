import { Injectable } from '@angular/core';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';
import { NgxsEntityCollections } from '@ngxs-labs/data/typings';
import { createEntityCollections } from '@ngxs-labs/data/utils';
import { State } from '@ngxs/store';
import { SpatialSceneNode } from 'ccf-body-ui';
import { map } from 'rxjs/operators';


/**
 * Scene state model
 */
// tslint:disable-next-line: no-empty-interface
export interface SceneStateModel {
}


/**
 * General page global state
 */
@StateRepository()
@State<NgxsEntityCollections<SpatialSceneNode, string, SceneStateModel>>({
  name: 'scene',
  defaults: {
    ...createEntityCollections()
  }
})
@Injectable()
export class SceneState extends NgxsDataEntityCollectionsRepository<SpatialSceneNode, string, SceneStateModel> {
  /** Key for nodes */
  public readonly primaryKey: string = '@id';

  /** Observable of spatial nodes */
  readonly nodes$ = this.entities$.pipe(map(obj => Object.values(obj)));
}
