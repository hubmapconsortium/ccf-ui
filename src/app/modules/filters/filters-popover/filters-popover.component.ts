import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ccf-filters-popover',
  templateUrl: './filters-popover.component.html',
  styleUrls: ['./filters-popover.component.scss']
})
export class FiltersPopoverComponent implements OnInit {
  filtersVisible = false;
  filtersBoxVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleFilterVisible(): void {
    this.filtersBoxVisible = !this.filtersBoxVisible;
    if(this.filtersVisible) {
      this.filtersVisible = false;
    } else {
      // Need to give the slide animation time to finish before displaying the content to keep from having
      // the container resizing abrubtly.
      setTimeout(() => {
          this.filtersVisible =!this.filtersVisible;
      }, 275);
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
  }
}
