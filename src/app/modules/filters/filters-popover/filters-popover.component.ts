import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ccf-filters-popover',
  templateUrl: './filters-popover.component.html',
  styleUrls: ['./filters-popover.component.scss']
})
export class FiltersPopoverComponent implements OnInit {
  filtersBoxVisible = false;
  @ViewChild('filterContainer', { read: ElementRef }) filterContainer: ElementRef<HtmlElement>;
  popupBody:HTMLElement|null;

  ngOnInit() {
    this.filterContainer = document.getElementById('popupContainer');
    this.popupBody = document.getElementById('popupBody');
  }

  toggleFilterVisible(): void {
    this.filtersBoxVisible = !this.filtersBoxVisible;

    if (this.filtersBoxVisible) {
      this.displayFilters();
    } else {
      this.hideFilters();
    }
  }

  displayFilters(): void {
    if (!this.filterContainer || !this.popupBody) {
      return;
    }

    this.filterContainer.style.width = '35em';
    this.popupBody.style.transitionDelay = '.3s';
    this.popupBody.style.transitionDuration = '.3s';
    this.popupBody.style.opacity = '100%';
  }

  hideFilters(): void {
    if (!this.filterContainer || !this.popupBody) {
      return;
    }

    this.filterContainer.style.width = '0em';
    this.popupBody.style.transitionDelay = '0s';
    this.popupBody.style.transitionDuration = '0s';
    this.popupBody.style.opacity = '0%';
  }

  applyFilters(filters: Record<string, unknown>) {
    // To be hooked up later to the real filter call.
    console.log('Filter box. Filters: ', filters);
    this.filtersBoxVisible = false;
    this.hideFilters();
  }
}
