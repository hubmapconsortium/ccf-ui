import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

import { SpatialSearchFilterItem } from '../../../core/store/spatial-search-filter/spatial-search-filter.state';
import { SetExecuteSearchOnGenerate } from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';


/**
 * Popover box for filter settings
 */
@Component({
  selector: 'ccf-filters-popover',
  templateUrl: './filters-popover.component.html',
  styleUrls: ['./filters-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersPopoverComponent implements OnChanges {
  @ViewChild('container', { static: false }) container: ElementRef<HTMLElement>;

  /**
   * Allows the filters to be set from outside the component, and still render / function normally
   */
  @Input() filters: Record<string, unknown | unknown[]>;

  /**
   * Keeps track of whether or not the containing drawer is expanded
   * Because the styles need to change accordingly
   */
  @Input() drawerExpanded: boolean;

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
   * Emits the current filters
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
   * Keeps track of whether or not the filters popover box is visible or not
   */
  filtersVisible = false;

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('spatialSearchFilters' in changes) {
      const popupHeight = this.spatialSearchFilters.length > 0 ? 43 + this.spatialSearchFilters.length * 3 : 40;
      this.renderer.setStyle(this.container.nativeElement, 'height', `${popupHeight}rem`);
    }
  }

  /**
   * Toggles filter visible
   */
  @Dispatch()
  toggleFilterVisible(): SetExecuteSearchOnGenerate {
    this.filtersVisible = !this.filtersVisible;
    return new SetExecuteSearchOnGenerate(false);
  }

  /**
   * Hides the filters popover box
   */
  @Dispatch()
  removeBox(): SetExecuteSearchOnGenerate {
    this.filtersVisible = false;
    return new SetExecuteSearchOnGenerate(true);
  }

  /**
   * Emits the current filters, and hides the popover box
   *
   * @param filters The object containing all the currently set filters
   */
  applyFilters(filters: Record<string, unknown>): void {
    this.filters = filters;
    this.filtersChange.emit(filters);
    this.removeBox();
  }
}
