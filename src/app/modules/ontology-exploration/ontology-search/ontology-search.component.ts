import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { get, sortBy } from 'lodash';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

import { OntologyNode } from '../../../core/models/ontology-node';
import { OntologySearchService, SearchResult } from '../../../core/services/ontology-search/ontology-search.service';


@Component({
  selector: 'ccf-ontology-search',
  templateUrl: './ontology-search.component.html',
  styleUrls: ['./ontology-search.component.scss']
})
export class OntologySearchComponent implements OnInit {
  /**
   * Creates an instance of ontology search component.
   * @param searchService instance of searchService which provides all the search functionality
   */
  constructor(public ontologyService: OntologySearchService) { }

  /**
   * Instance of FormControl - tracks the value and validation status of an individual form control
   */
  formControl = new FormControl('');

  autoCompleteOpen = false;

  /**
   * Observable which provides the filtered search results
   */
  filteredResults$: Observable<SearchResult[]>;

  /**
   * Output event-emitter which emits the id of the OntologyNode whose label was
   * selected by the user in the search-results
   */
  @Output() selected = new EventEmitter<OntologyNode>();

  /**
   * on-init lifecycle hook for this component -
   * gets the searched value from the view, sends it to the filter function in the OntologyService,
   * and gets the search results from the service
   */
  ngOnInit() {
    this.ontologyService.loadOntology();
    const valueChanges = this.formControl.valueChanges as Observable<string>;
    this.filteredResults$ = valueChanges.pipe(
      filter(value => typeof value === 'string'),
      startWith(''),
      switchMap(value => this.ontologyService.filter(value)),
      map(searchResults => sortBy(searchResults, [
        this.sortBySynonymResult, 'index', this.sortLexically
      ]))
    );
  }

  /**
   * A formatter function to enable different display and selected value
   * @param option a search result entry
   * @returns a part of the search result entry to be displayed as a display value
   */
  displayFormatter(option?: SearchResult): string {
    return (option?.displayLabel ?? []).join('');
  }

  /**
   * Sorts by results which have synonyms
   * @param entry search result entry
   * @returns 1 or -1
   */
  private sortBySynonymResult(this: void, entry: SearchResult): number {
    return entry.displayLabel.join().includes('(') ? 1 : -1;
  }

  /**
   * Sorts lexically
   * @param entry search result entry
   * @returns lower case value of node label
   */
  private sortLexically(this: void, entry: SearchResult): string {
    return entry.node.label.toLowerCase();
  }

  /**
   * Callback function triggered when the user selects a value from search results
   * @param event instance of MatAutocompleteSelectedEvent
   */
  onSelect(event: MatAutocompleteSelectedEvent): void {
    const node = get(event, 'option.value.node') as OntologyNode;
    if (node) {
      this.selected.emit(node);
      this.formControl.reset();
    }
  }
}
