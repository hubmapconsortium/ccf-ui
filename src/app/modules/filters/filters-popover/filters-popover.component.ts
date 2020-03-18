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

    if (this.filtersBoxVisible) {
      this.displayFilters();
    } else {
      this.hideFilters();
    }
  }

  displayFilters(): void {
    this.popupContainerWidth = '35em';
    this.popupBodyOpacity = '100%';
    this.popupBodyTransitionDelay = '.3s';
    this.popupBodyTransitionDuration = '.3s';
  }

  hideFilters(): void {
    this.popupContainerWidth = '0em';
    this.popupBodyOpacity = '0%';
    this.popupBodyTransitionDelay = '0s';
    this.popupBodyTransitionDuration = '0s';
  }

  applyFilters(filters: Record<string, unknown>) {
    // To be hooked up later to the real filter call.
    console.log('Filter box. Filters: ', filters);
    this.filtersBoxVisible = false;
    this.hideFilters();
  }
}
