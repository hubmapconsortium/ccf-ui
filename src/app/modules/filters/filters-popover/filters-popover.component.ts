import { Component } from '@angular/core';

@Component({
  selector: 'ccf-filters-popover',
  templateUrl: './filters-popover.component.html',
  styleUrls: ['./filters-popover.component.scss']
})
export class FiltersPopoverComponent {
  filtersVisible = false;
  filtersBoxVisible = false;

  toggleFilterVisible(): void {
    this.filtersBoxVisible = !this.filtersBoxVisible;
    this.filtersVisible = !this.filtersVisible;

    const filterContainer = document.getElementById('filterContainer');
    const popupBody = document.getElementById('popupBody');
    if (!filterContainer || !popupBody) {
      return;
    }

    if (this.filtersBoxVisible) {
      filterContainer.style.width = '35em';

      popupBody.style.transitionDelay = '.3s';
      popupBody.style.transitionDuration = '.3s';
      popupBody.style.opacity = '100%';
    } else {
      filterContainer.style.width = '0em';

      popupBody.style.transitionDelay = '0s';
      popupBody.style.transitionDuration = '0s';
      popupBody.style.opacity = '0%';
    }
  }

  setFilterBoxClasses() {
    return {
      'filter-box': !this.filtersVisible,
      'filter-box-expanded': this.filtersVisible
    };
  }

  applyFilters(filters: Record<string, unknown>) {
    // To be hooked up later to the real filter call.
    console.log('Filter box. Filters: ', filters);
    this.filtersBoxVisible = false;
    this.filtersVisible = false;
  }
}
