import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { get } from 'lodash';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

import { OntologySearchService, SearchResult } from '../../shared/services/ontology-search/ontology-search.service';
import { OntologyNode } from '../../shared/state/ontology/ontology.model';

/**
 * Ontology Search Component responsible for searching the ontology
 */
@Component({
  selector: 'ccf-ontology-search',
  templateUrl: './ontology-search.component.html',
  styleUrls: ['./ontology-search.component.scss']
})
export class OntologySearchComponent implements OnInit {
  /**
   * Output event-emitter which emits the id of the OntologyNode whose label was
   * selected by the user in the search-results
   */
  @Output() selected = new EventEmitter<OntologyNode>();
  /**
   * Instance of FormControl - tracks the value and validation status of an individual form control
   */
  formControl = new FormControl();
  /**
   * Observable which provides the filtered search results
   */
  filteredResults$: Observable<SearchResult[]>;

  /**
   * Creates an instance of ontology search component.
   * @param searchService instance of searchService which provides all the search functionality
   */
  constructor(private searchService: OntologySearchService) { }

  /**
   * on-init lifecycle hook for this component -
   * gets the searched value from the view, sends it to the filter function in the OntologyService,
   * and gets the search results from the service
   */
  ngOnInit() {
    this.filteredResults$ = this.formControl.valueChanges.pipe(
      filter(value => typeof value === 'string'),
      startWith(''),
      switchMap(value => this.searchService.filter(value)),
      map(searchResults => searchResults
        .sort((entry1, entry2) => entry1.index - entry2.index) // first sort by substring match index
        .sort((entry1, entry2) => entry2.displayLabel.join().localeCompare(entry1.displayLabel.join())) // then sort lexically
        .sort(entry1 => entry1.displayLabel.join().includes('(') ? 1 : -1) // then sort by if it was found in the label or synonym-labels
      )
    );
  }

  /**
   * Callback function triggered when the user selects a value from search results
   * @param id ontology node id of the selected search result
   */
  onSelect(event: MatAutocompleteSelectedEvent): void {
    const node = get(event, 'option.value.node');
    if (node) {
      this.selected.emit(node);
    }
  }

  /**
   * A formatter function to enable different display and selected value
   * @param option a search result entry
   * @returns a part of the search result entry to be displayed as a display value
   */
  displayFormatter(option: SearchResult): string {
    if (option) {
      return option.displayLabel.join('');
    }
  }
}
