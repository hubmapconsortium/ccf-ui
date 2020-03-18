import { Component } from '@angular/core';

@Component({
  selector: 'ccf-filters-popover',
  templateUrl: './filters-popover.component.html',
  styleUrls: ['./filters-popover.component.scss']
})
export class FiltersPopoverComponent {
  filters: Record<string, unknown[]> = { tmc: [], technologies: [], sex: ['Both'], ageRange: [1, 110], BMIRange: [13, 83] };
  filtersVisible = false;
  filtersBoxVisible = false;

  toggleFilterVisible(): void {
    this.filtersBoxVisible = !this.filtersBoxVisible;
    if (this.filtersVisible) {
      this.filtersVisible = false;
    } else {
      // Need to give the slide animation time to finish before displaying the content to keep from having
      // the container resizing abrubtly.
      setTimeout(() => {
        this.filtersVisible = !this.filtersVisible;
      }, 275);
    }
  }

  setFilterBoxClasses() {
    return {
      'filter-box': !this.filtersVisible,
      'filter-box-expanded': this.filtersVisible
    };
  }

  applyFilters(filters: Record<string, unknown[]>) {
    // To be hooked up later to the real filter call.
    console.log('Filter box. Filters: ', filters);
    this.filters = filters;
    this.filtersBoxVisible = false;
    this.filtersVisible = false;
  }
}
