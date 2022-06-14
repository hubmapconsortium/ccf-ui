import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpatialSearchListItem } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { DEFAULT_FILTER } from '../../../core/store/data/data.state';
import {
  SpatialSearchConfigBehaviorComponent,
} from '../../../shared/components/spatial-search-config-behavior/spatial-search-config-behavior.component';

/**
 * Contains components of the filters popup and handles changes in filter settings
 */
@Component({
  selector: 'ccf-filters-content',
  templateUrl: './filters-content.component.html',
  styleUrls: ['./filters-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersContentComponent<S extends SpatialSearchListItem> {

  /**
   * Determines if the filters are visible
   */
  @Input() hidden: boolean;

  /**
   * Allows the filters to be set from outside the component
   */
  @Input() filters: Record<string, unknown | unknown[]>;

  /**
   * List of technologies in the data
   */
  @Input() technologyFilters: string[];

  /**
   * List of providers in the data
   */
  @Input() providerFilters: string[];

  /**
   * List of spatial searches
   */
  @Input() spatialSearchFilters: S[] = [];

  /**
   * Emits the filter change when they happen
   */
  @Output() readonly filtersChange = new EventEmitter<Record<string, unknown>>();

  /**
   * Emits when a spatial search is removed/deleted
   */
  @Output() readonly spatialSearchRemoved = new EventEmitter<S>();

  /**
   * Emits the filters to be applied
   */
  @Output() readonly applyFilters = new EventEmitter<Record<string, unknown>>();

  /**
   * Creates an instance of filters content component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService, public dialog: MatDialog) { }

  openSpatialSearch(): void {
    this.dialog.open(SpatialSearchConfigBehaviorComponent);
  }

  /**
   * Updates the filter object with a new key/value
   *
   * @param value The value to be saved for the filter
   * @param key The key for the filter to be saved at
   */
  updateFilter(value: unknown, key: string): void {
    this.filters = { ...this.filters, [key]: value };
    this.ga.event('filter_update', 'filter_content', `${key}:${value}`);
    this.filtersChange.emit(this.filters);
  }

  /**
   * Emits the current filters when the apply button is clicked
   */
  applyButtonClick(): void {
    this.ga.event('filters_applied', 'filter_content');
    this.applyFilters.emit(this.filters);
  }

  /**
   * Refreshes all filter settings
   */
  refreshFilters(): void {
    this.filters = JSON.parse(JSON.stringify(DEFAULT_FILTER));
    this.ga.event('filters_reset', 'filter_content');
    this.filtersChange.emit(this.filters);
  }
}
