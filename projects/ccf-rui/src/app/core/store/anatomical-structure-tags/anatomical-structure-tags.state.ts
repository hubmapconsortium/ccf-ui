import { Injectable, Injector } from '@angular/core';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataEntityCollectionsRepository } from '@ngxs-labs/data/repositories';
import { NgxsEntityCollections } from '@ngxs-labs/data/typings';
import { createEntityCollections } from '@ngxs-labs/data/utils';
import { State } from '@ngxs/store';
import { bind as Bind } from 'bind-decorator';
import { ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tag, TagId, TagSearchResult } from '../../models/anatomical-structure-tag';
import { DataSourceService } from '../../services/data-source/data-source.service';
import { ModelState } from '../model/model.state';


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
   * Searches for matching tags (not in the state)
   *
   * @param text Search text
   * @param limit Maximum returned results hint
   * @returns external Search result
   */
  @Bind
  searchExternal(text: string, limit: number): ObservableInput<TagSearchResult> {
    const matches = this.model.snapshot.anatomicalStructures
      .filter(as => as.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
    return [{
      totalCount: matches.length,
      results: matches.map((as) => ({
        id: as.id,
        label: as.name,
        type: 'added'
      }))
    }];
  }
}
