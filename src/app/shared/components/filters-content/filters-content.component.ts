import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Filter } from '../../models/filters';

@Component({
  selector: 'ccf-filters-content',
  templateUrl: './filters-content.component.html',
  styleUrls: ['./filters-content.component.scss']
})
export class FiltersContentComponent implements OnInit {
  @Output() applyFilters: EventEmitter<Array<Filter>> = new EventEmitter();

  filters: Array<Filter> = [
    {
      type: 'checkbox',
      label: 'Technologies',
      options: [
        'IMS',
        'MxIF',
        'PAS'
      ],
      selection: []
    },
    {
      type: 'checkbox',
      label: 'Tissue Mapping Center (TMC)',
      options: [
        'TMC-CalTech',
        'TMC-Florida',
        'TMC-Stanford',
        'TMC-UCSD',
        'TMC-Vanderbilt'
      ],
      selection: []
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  applyButtonClick(): void {
    const selectedFilters = this.selectedFilters();
    if (!selectedFilters.length) { return; }
    this.applyFilters.emit(selectedFilters);
  }

  selectedFilters(): Filter[] {
    return this.filters.filter(tempFilter => !!tempFilter.selection.length);
  }

  updateFilter(filter: Filter): void {
    const filterIndex: number = this.getFilterIndex(filter);
    this.filters[filterIndex] = filter;
  }

  getFilterIndex(filter: Filter): number {
    const label = filter.label;
    let index = -1;

    this.filters.forEach((tempFilter, filterIndex) => {
      if (tempFilter.label === label) { index = filterIndex; }
    });

    if (index === -1) { console.error('Index of filter not found. Filter: ', filter); }
    return index;
  }

}
