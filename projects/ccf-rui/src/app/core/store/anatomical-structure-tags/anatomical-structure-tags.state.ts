import { Injectable } from '@angular/core';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';
import { NgxsEntityCollections } from '@ngxs-labs/data/typings';
import { createEntityCollections } from '@ngxs-labs/data/utils';
import { State } from '@ngxs/store';
import { map } from 'rxjs/operators';

import { Tag, TagId } from '../../models/anatomical-structure-tag';


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
}
