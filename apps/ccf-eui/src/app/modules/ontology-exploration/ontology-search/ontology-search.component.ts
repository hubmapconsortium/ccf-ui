import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { OntologyTreeNode } from 'ccf-database';
import { get, sortBy } from 'lodash';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

import { OntologySearchService, SearchResult } from '../../../core/services/ontology-search/ontology-search.service';


/**
 * Componenet for searching the Ontology nodes.
 */
@Component({
  selector: 'ccf-ontology-search',
  templateUrl: './ontology-search.component.html',
  styleUrls: ['./ontology-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OntologySearchComponent implements OnInit {
  @Input() placeholderText!: string;

  /**
   * Output event-emitter which emits the id of the OntologyTreeNode whose label was
   * selected by the user in the search-results
   */
  @Output() readonly selected = new EventEmitter<OntologyTreeNode>();

  /**
   * Instance of FormControl - tracks the value and validation status of an individual form control
   */
  formControl = new UntypedFormControl('');


  /**
   * Determines if autocomplete is open or close.
   */
  autoCompleteOpen = false;

  /**
   * Observable which provides the filtered search results
   */
  filteredResults$!: Observable<SearchResult[]>;

  /**
   * Creates an instance of ontology search component.
   *
   * @param ontologyService instance of searchService which provides all the search functionality
   * @param ga Analytics service
   */
  constructor(public ontologyService: OntologySearchService, private readonly ga: GoogleAnalyticsService) { }

  /**
   * on-init lifecycle hook for this component -
   * gets the searched value from the view, sends it to the filter function in the OntologyService,
   * and gets the search results from the service
   */
  ngOnInit(): void {
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
   *
   * @param option a search result entry
   * @returns a part of the search result entry to be displayed as a display value
   */
  displayFormatter(option?: SearchResult): string {
    return (option?.displayLabel ?? []).join('');
  }

  /**
   * Sorts by results which have synonyms
   *
   * @param entry search result entry
   * @returns 1 or -1
   */
  sortBySynonymResult(this: void, entry: SearchResult): number {
    return entry.displayLabel.join().includes('(') ? 1 : -1;
  }

  /**
   * Sorts lexically
   *
   * @param entry search result entry
   * @returns lower case value of node label
   */
  sortLexically(this: void, entry: SearchResult): string {
    return entry.node.label.toLowerCase();
  }

  /**
   * Callback function triggered when the user selects a value from search results
   *
   * @param event instance of MatAutocompleteSelectedEvent
   */
  onSelect(event: MatAutocompleteSelectedEvent): void {
    const node = get(event, ['option', 'value', 'node']) as OntologyTreeNode;
    if (node) {
      this.ga.event('search', 'ontology_search', node.id);
      this.selected.emit(node);
      this.formControl.reset();
    }
  }
}
