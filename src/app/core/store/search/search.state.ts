import { Injectable } from '@angular/core';
import { action, NgxsDataRepository, StateRepository } from '@ngxs-labs/data';
import { State } from '@ngxs/store';

import { OntologyNode } from '../../models/ontology-node';


/**
 * Search state model.
 */
export interface SearchStateModel {
  /**
   * The currently selected anatomical location.
   */
  location: OntologyNode | undefined;
  id: string;
}

/**
 * Contains the currently active search parameters.
 */
@StateRepository()
@State<SearchStateModel>({
  name: 'search',
  defaults: {
    location: undefined,
    id: ''
  }
})
@Injectable()
export class SearchState extends NgxsDataRepository<SearchStateModel>  {
  /**
   * Sets the new search location.
   * @param ontology New state.
   */
  @action()
  setLocation(ontology: SearchStateModel): void {
    this.ctx.setState(ontology);
  }
}
