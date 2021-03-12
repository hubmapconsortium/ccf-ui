import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Contains components of the filters popup and handles changes in filter settings
 */
@Component({
  selector: 'ccf-filters-content',
  templateUrl: './filters-content.component.html',
  styleUrls: ['./filters-content.component.scss']
})
export class FiltersContentComponent {

  /**
   * Determines if the filters are visible
   */
  @Input() hidden: boolean;

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
   *
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

  /**
   * Refreshes all filter settings
   */
  refreshFilters(): void {
    this.filters = { ...this.filters, sex: 'Both', ageRange: [1, 110], bmiRange: [13, 83], technologies: [], tmc: []};
    this.filtersChange.emit(this.filters);
  }
}
