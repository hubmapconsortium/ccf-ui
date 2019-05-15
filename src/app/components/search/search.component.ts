import { Component } from '@angular/core';

import { OntologyService } from '../../shared/services/ontology/ontology.service';
import { SearchService } from '../../shared/services/search/search.service';

/**
 * Container component for search filters.
 */
@Component({
  selector: 'ccf-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  /**
  * Available search filter categories and their values, TODO - needs to be fetched from the data
  * based on the implementation
  */
  filterCategories = new Map([
    ['Technologies', ['IMS', 'MxIF', 'AF', 'PAS', 'IHC']],
    ['TMCs', ['TMC-Vanderbilt', 'TMC-UCSD', 'TMC-Stanford', 'TMC-Florida', 'TMC-CalTech']]
  ]);

  /**
   * Creates an instance of search component.
   *
   * @param ontology The service used to interact with the ontology.
   * @param search Service used to update the search state.
   */
  constructor(readonly ontology: OntologyService, readonly search: SearchService) { }
}
