import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ccf-filters-popover',
  templateUrl: './filters-popover.component.html',
  styleUrls: ['./filters-popover.component.scss']
})
export class FiltersPopoverComponent {
  @Input() filters: Record<string, unknown | unknown[]>;
  @Output() filtersChange = new EventEmitter<Record<string, unknown>>();
  filtersVisible = false;

  toggleFilterVisible(): void {
    this.filtersVisible = !this.filtersVisible;
  }

  removeBox() {
    this.filtersVisible = false;
  }

  applyFilters(filters: Record<string, unknown>) {
    // To be hooked up later to the real filter call.
    console.log('Filter box. Filters: ', filters);
    this.filters = filters;
    this.filtersChange.emit(filters);
    this.filtersVisible = false;
  }
}
