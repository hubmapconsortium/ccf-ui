import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'ccf-ontology-search',
  templateUrl: './ontology-search.component.html',
  styleUrls: ['./ontology-search.component.scss']
})
export class OntologySearchComponent implements OnInit {
  formControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions$: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.filteredOptions$ = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
