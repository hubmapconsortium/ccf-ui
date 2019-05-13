import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { OntologySearchService, SearchResult } from '../../shared/services/ontology-search/ontology-search.service';

@Component({
  selector: 'ccf-ontology-search',
  templateUrl: './ontology-search.component.html',
  styleUrls: ['./ontology-search.component.scss']
})
export class OntologySearchComponent implements OnInit {
  @Output() selected = new EventEmitter<string>();
  formControl = new FormControl();
  filteredOptions$: Observable<SearchResult[]>;

  constructor(private searchService: OntologySearchService) { }

  ngOnInit() {
    this.filteredOptions$ = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.searchService.filter(value)
        .sort((entry1, entry2) => entry1.index - entry2.index)
        .sort(entry1 => {
          if (entry1.displayLabel.join().includes('(')) {
            return 1;
          } else {
            return -1;
          }
        })
      )
    );
  }

  onSelect(event: MatAutocompleteSelectedEvent): void {
    if (event && event.option && event.option.value) {
      this.selected.emit(event.option.value.node.id);
    }
  }

  displayFormatter(option: SearchResult): string {
    if (option) {
      return option.displayLabel.join();
    }
  }
}
