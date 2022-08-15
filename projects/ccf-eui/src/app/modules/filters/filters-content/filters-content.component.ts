import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { DEFAULT_FILTER } from '../../../core/store/data/data.state';
import { SpatialSearchFilterItem } from '../../../core/store/spatial-search-filter/spatial-search-filter.state';
import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';


/**
 * Contains components of the filters popup and handles changes in filter settings
 */
@Component({
  selector: 'ccf-filters-content',
  templateUrl: './filters-content.component.html',
  styleUrls: ['./filters-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersContentComponent implements OnChanges {

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
  @Input() spatialSearchFilters: SpatialSearchFilterItem[] = [];

  /**
   * Emits the filter change when they happen
   */
  @Output() readonly filtersChange = new EventEmitter<Record<string, unknown>>();

  /**
   * Emits when a spatial search is selected/deselected
   */
  @Output() readonly spatialSearchSelected = new EventEmitter<SpatialSearchFilterItem[]>();

  /**
   * Emits when a spatial search is removed/deleted
   */
  @Output() readonly spatialSearchRemoved = new EventEmitter<string>();

  /**
   * Emits the filters to be applied
   */
  @Output() readonly applyFilters = new EventEmitter<Record<string, unknown>>();

  /**
   * Creates an instance of filters content component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Handle input changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('spatialSearchFilters' in changes) {
      this.updateSexFromSelection(this.spatialSearchFilters.filter(item => item.selected));
    }
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
    this.updateSearchSelection(this.spatialSearchFilters.filter(item => item.selected));
    this.ga.event('filters_applied', 'filter_content');
    this.applyFilters.emit(this.filters);
  }

  /**
   * Refreshes all filter settings
   */
  refreshFilters(): void {
    this.filters = JSON.parse(JSON.stringify(DEFAULT_FILTER));
    this.ga.event('filters_reset', 'filter_content');
    this.spatialSearchSelected.emit([]);
    this.filtersChange.emit(this.filters);
  }

  /**
   * Emits events for updated searches
   *
   * @param items New set of selected items
   */
  updateSearchSelection(items: SpatialSearchFilterItem[]): void {
    const searches = items.map(item => item.search);

    this.spatialSearchSelected.emit(items);
    this.updateFilter(searches, 'spatialSearches');
    this.updateSexFromSelection(items);
  }

  /**
   * Updates sex to `Both` if there is a mismatch between the current selection and the sex
   */
  updateSexFromSelection(items: SpatialSearchFilterItem[]): void {
    const currentSex = (this.filters['sex'] as string)?.toLowerCase() as Sex;
    const selectedSexes = new Set(items.map(item => item.sex));

    if (items.length > 0 && (selectedSexes.size > 1 || !selectedSexes.has(currentSex))) {
      this.updateFilter('Both', 'sex');
    }
  }
}
