import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ccf-filters-content',
  templateUrl: './filters-content.component.html',
  styleUrls: ['./filters-content.component.scss']
})
export class FiltersContentComponent {
  /**
   * Allows the filters to be set from outside the component
   */
  @Input() filters: Record<string, unknown | unknown[]>;

  /**
   * Emits the filter change when they happen
   */
  @Output() filtersChange = new EventEmitter<Record<string, unknown>>();

  /**
   * Emits the filters to be applied
   */
  @Output() applyFilters = new EventEmitter<Record<string, unknown>>();

  /**
   * Updates the filter object with a new key/value
   * @param value The value to be saved for the filter
   * @param key The key for the filter to be saved at
   */
  updateFilter(value: unknown, key: string): void {
    this.filters = { ...this.filters, [key]: value };
    this.filtersChange.emit(this.filters);
  }

  /**
   * Emits the current filters when the apply button is clicked
   */
  applyButtonClick(): void {
    this.applyFilters.emit(this.filters);
  }
}
