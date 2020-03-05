import { Injectable } from '@angular/core';
import { action, NgxsDataRepository, StateRepository } from '@ngxs-labs/data';
import { State } from '@ngxs/store';

import { SearchStateModel } from '../../models/search-state.model';

/**
 * Contains the currently active search parameters.
 */
@StateRepository()
@State<SearchStateModel>({
  name: 'search',
  defaults: {
    location: undefined
  }
})
@Injectable()
export class SearchState extends NgxsDataRepository<SearchStateModel>  {

  @action()
  setLocation(ontology: SearchStateModel): void {
    this.ctx.setState((state) => ontology);
  }
}
