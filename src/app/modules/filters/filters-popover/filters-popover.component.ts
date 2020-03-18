import { Component } from '@angular/core';

@Component({
  selector: 'ccf-filters-popover',
  templateUrl: './filters-popover.component.html',
  styleUrls: ['./filters-popover.component.scss']
})
export class FiltersPopoverComponent {
  filtersBoxVisible = false;
  popupContainerWidth = '0em';
  popupBodyTransitionDelay = '.3s';
  popupBodyTransitionDuration = '.3s';
  popupBodyOpacity = '0%';

  toggleFilterVisible(): void {
    this.filtersBoxVisible = !this.filtersBoxVisible;
  }

  applyFilters(filters: Record<string, unknown>) {
    // To be hooked up later to the real filter call.
    console.log('Filter box. Filters: ', filters);
    this.filtersBoxVisible = false;
  }
}
