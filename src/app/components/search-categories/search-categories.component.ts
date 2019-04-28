import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SearchService } from '../../shared/services/search/search.service';

/**
 * Search categories responsible for the search functionality through a given set of categories
 */
@Component({
  selector: 'ccf-search-categories',
  templateUrl: './search-categories.component.html',
  styleUrls: ['./search-categories.component.scss']
})
export class SearchCategoriesComponent implements OnChanges {
  /**
   * Input of search filters with their categories as a Map<filterCategory: string, values: string[]>
   */
  @Input() filterCategories: Map<string, string[]>;
  /**
   * Keeps track of the filter categories - keys of the filterCategories(above) to display them as tabs on the UI
   */
  categories: Array<string>;
  /**
   * Selected search filters maintained as a Map<filterCategory: string, values: string[]>
   */
  selectedFilterCategories = new Map<string, Set<string>>();

  /**
   * Creates an instance of Search Caetgories component.
   * @param searchService instance of the SearchService
   */
  constructor(private searchService: SearchService) {
  }

  /**
   * on changes lifecycle hook for this component
   * @param changes instance of SimpleChanges which provides the changed value of the Input variable to this component
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('filterCategories' in changes) {
      // gets the search filter categories
      this.categories = Array.from(this.filterCategories.keys());
    }
  }

  /**
   * function responsible to update the selectedfilterCategories data-structure
   * and dispatch actions to update the data-structures for categories in the search-state
   * @param category filterCategory to which the search filter value belongs
   * @param filter filter value selected
   */
  selected(category: string, filter: string) {
    let filterValues = this.selectedFilterCategories.get(category);

    if (!filterValues) {
      filterValues = new Set();
      this.selectedFilterCategories.set(category, filterValues);
    }

    if (!filterValues.has(filter)) {
      filterValues.add(filter);
      this.updateSearchState('select', category, filter);
    } else {
      filterValues.delete(filter);
      this.updateSearchState('unselect', category, filter);
    }
  }

  /**
   * Determines whether the filter value is selected
   * @param category filter category to which the filter value belongs
   * @param filter the filter value
   * @returns boolean
   */
  isSelected(category: string, filter: string) {
    const selectedFilterValues = this.selectedFilterCategories.get(category);
    return category && selectedFilterValues && selectedFilterValues.has(filter);
  }

  /**
   * Uses the search-service to update the search state
   * @param operation string to indicate if the filterValue is being selected or unselected
   * @param category filter category to which the filter value belongs
   * @param filter filter value being selected/unselected
   */
  private updateSearchState(operation: string, category: string, filter: string) {
    if (operation === 'select') {
      switch (category) {
        case 'Technologies': this.searchService.selectTechnology(filter); break;
        case 'TMCs': this.searchService.selectTMC(filter); break;
      }
    }

    if (operation === 'unselect') {
      switch (category) {
        case 'Technologies': this.searchService.unselectTechnology(filter); break;
        case 'TMCs': this.searchService.unselectTMC(filter); break;
      }
    }
  }
}
