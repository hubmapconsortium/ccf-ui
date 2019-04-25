import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { SearchService } from '../../shared/services/search/search.service';

@Component({
  selector: 'ccf-tissue-search',
  templateUrl: './tissue-search.component.html',
  styleUrls: ['./tissue-search.component.scss']
})
export class TissueSearchComponent implements OnChanges {
  @Input() searchFilters: Map<string, string[]>;
  searchFilterCategories: Array<string>;
  selectedSearchFilters = new Map<string, Set<string>>();

  constructor(private searchService: SearchService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('searchFilters' in changes) {
      this.searchFilterCategories = Array.from(this.searchFilters.keys());
    }
  }

  selected(criteria: string, filter: string) {
    const selectedCriteria = this.selectedSearchFilters.get(criteria);

    if (!selectedCriteria) {
      this.selectedSearchFilters.set(criteria, new Set([filter]));
      this.updateSearchState('select', criteria, filter);
    } else if (!selectedCriteria.has(filter)) {
      selectedCriteria.add(filter);
      this.updateSearchState('select', criteria, filter);
    } else {
      selectedCriteria.delete(filter);
      this.updateSearchState('unselect', criteria, filter);
    }
  }

  isSelected(criteria: string, filter: string) {
    const selectedCriteria = this.selectedSearchFilters.get(criteria);
    return selectedCriteria && selectedCriteria.has(filter);
  }

  updateSearchState(operation: string, criteria: string, filter: string) {
    if (operation === 'select') {
      switch (criteria) {
        case 'Technologies': this.searchService.selectTechnology(filter); break;
        case 'TMCs': this.searchService.selectTMC(filter); break;
      }
    }

    if (operation === 'unselect') {
      switch (criteria) {
        case 'Technologies': this.searchService.unselectTechnology(filter); break;
        case 'TMCs': this.searchService.unselectTMC(filter); break;
      }
    }
  }
}
