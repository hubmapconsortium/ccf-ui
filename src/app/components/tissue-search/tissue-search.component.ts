import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ccf-tissue-search',
  templateUrl: './tissue-search.component.html',
  styleUrls: ['./tissue-search.component.scss']
})
export class TissueSearchComponent implements OnChanges {
  @Input() searchFilters: Map<'Technologies' | 'TMCs', string[]>;
  searchFilterCategories: Array<'Technologies' | 'TMCs'>;
  selectedSearchFilters = new Map<'Technologies' | 'TMCs', Set<string>>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('searchFilters' in changes) {
      this.searchFilterCategories = Array.from(this.searchFilters.keys());
    }
  }

  selected(criteria: 'Technologies' | 'TMCs', filter: string) {
    const selectedCriteria = this.selectedSearchFilters.get(criteria);

    if (!selectedCriteria) {
      this.selectedSearchFilters.set(criteria, new Set([filter]));
    } else if (!selectedCriteria.has(filter)) {
      selectedCriteria.add(filter);
    } else {
      selectedCriteria.delete(filter);
    }
  }

  isSelected(criteria: 'Technologies' | 'TMCs', filter: string) {
    const selectedCriteria = this.selectedSearchFilters.get(criteria);
    return selectedCriteria && selectedCriteria.has(filter);
  }
}
