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

  applyFilters(filters: Record<string, unknown>){
    console.log('Filter box. Filters: ', filters);
  }

}
