import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Popover box for filter settings
 */
@Component({
  selector: 'ccf-filters-popover',
  templateUrl: './filters-popover.component.html',
  styleUrls: ['./filters-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersPopoverComponent {
  /**
   * Allows the filters to be set from outside the component, and still render / function normally
   */
  @Input() filters: Record<string, unknown | unknown[]>;

  /**
   * Keeps track of whether or not the containing drawer is expanded
   * Because the styles need to change accordingly
   */
  @Input() drawerExpanded: boolean;

  @Input() technologyFilters: string[];
  @Input() providerFilters: string[];

  /**
   * Emits the current filters
   */
  @Output() readonly filtersChange = new EventEmitter<Record<string, unknown>>();

  /**
   * Keeps track of whether or not the filters popover box is visible or not
   */
  filtersVisible = false;

  /**
   * Toggles filter visible
   */
  toggleFilterVisible(): void {
    this.filtersVisible = !this.filtersVisible;
  }

  /**
   * Hides the filters popover box
   */
  removeBox(): void {
    this.filtersVisible = false;
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
