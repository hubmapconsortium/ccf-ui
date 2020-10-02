import { Injectable } from '@angular/core';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';
import { NgxsEntityCollections } from '@ngxs-labs/data/typings';
import { createEntityCollections } from '@ngxs-labs/data/utils';
import { State } from '@ngxs/store';
import { bind as Bind } from 'bind-decorator';
import { ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tag, TagId, TagSearchResult } from '../../models/anatomical-structure-tag';


/** Tag state model */
// tslint:disable-next-line: no-empty-interface
export interface AnatomicalStructureTagStateModel {
}


/**
 * Tag collection global state
 */
@StateRepository()
@State<NgxsEntityCollections<Tag, TagId, AnatomicalStructureTagStateModel>>({
  name: 'tags',
  defaults: {
    ...createEntityCollections()
  }
})
@Injectable()
export class AnatomicalStructureTagState extends NgxsDataEntityCollectionsRepository<Tag, TagId, AnatomicalStructureTagStateModel> {
  /** Observable of tags */
  readonly tags$ = this.entities$.pipe(map(obj => Object.values(obj)));

  /**
   * Searches for matching tags (not in the state)
   *
   * @param text Search text
   * @param limit Maximum returned results hint
   * @returns external Search result
   */
  @Bind
  searchExternal(text: string, limit: number): ObservableInput<TagSearchResult> {
    // FIXME: Needs implementation
    return [{
      totalCount: 1,
      results: [{
        id: 'test-tag',
        label: 'test-tag',
        type: 'added'
      }]
    }];
  }
}
