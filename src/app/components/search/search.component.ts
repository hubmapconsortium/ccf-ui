import { Component } from '@angular/core';

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
    ['TMCs', ['Vanderbilt', 'UCSD', 'Stanford', 'Florida', 'CalTech']]
  ]);
}
