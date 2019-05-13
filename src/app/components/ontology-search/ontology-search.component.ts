import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { SearchService } from '../../shared/services/search/search.service';
import { OntologyNode } from '../../shared/state/ontology/ontology.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { EventEmitter } from '@angular/core';


export interface SearchResult {
  index: number;
  displayLabel: string;
  node: OntologyNode;
}
@Component({
  selector: 'ccf-ontology-search',
  templateUrl: './ontology-search.component.html',
  styleUrls: ['./ontology-search.component.scss']
})
export class OntologySearchComponent implements OnInit {
  @Output() selected = new EventEmitter<string>();
  formControl = new FormControl();
  filteredOptions$: Observable<SearchResult[]>;
  private ontologyNodes: OntologyNode[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.stateObservable.subscribe((ontologyNodes) => {
      this.ontologyNodes = ontologyNodes;
    });

    this.filteredOptions$ = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value)
        .sort((entry1, entry2) => entry1.index - entry2.index)
        .sort(entry1 => {
          if (entry1.displayLabel.includes('(')) {
            return 1;
          } else {
            return -1;
          }
        })
      )
    );
  }

  private filter(value: string): SearchResult[] {
    const filterValue = typeof value === 'string' && value.length && value.toLowerCase();
    const searchResults = new Map<string, SearchResult>();

    if (this.ontologyNodes) {
      this.ontologyNodes.forEach((node, index) => {
        const condition = node.label.toLowerCase().includes(filterValue);
        if (condition && !searchResults.get(node.id)) {
          searchResults.set(node.id, { index: index, displayLabel: node.label, node: node });
        } else {
          const match = node.synonymLabels.find((label) => label.toLowerCase().includes(filterValue));
          if (match && !searchResults.get(node.id)) {
            searchResults.set(node.id, { index: index, displayLabel: node.label + ` (${match})`, node: node });
          }
        }
      });
    }

    return Array.from(searchResults.values());
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    if (event && event.option && event.option.value) {
      this.selected.emit(event.option.value.node.id);
    }
  }

  displayFormatter(option: SearchResult): string {
    if (option) {
      return option.displayLabel;
    }
  }
}
