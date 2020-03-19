import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ccf-filters-content',
  templateUrl: './filters-content.component.html',
  styleUrls: ['./filters-content.component.scss']
})
export class FiltersContentComponent {
  @Input() filters: Record<string, unknown | unknown[]>;
  @Output() filtersChange = new EventEmitter<Record<string, unknown>>();
  @Output() applyFilters = new EventEmitter<Record<string, unknown>>();

  updateFilter(value: unknown, key: string): void {
    this.filters = { ...this.filters, [key]: value };
    this.filtersChange.emit(this.filters);
  }

  applyButtonClick(): void {
    this.applyFilters.emit(this.filters);
  }
}
