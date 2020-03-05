import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ccf-filters-content',
  templateUrl: './filters-content.component.html',
  styleUrls: ['./filters-content.component.scss']
})
export class FiltersContentComponent implements OnInit {
  filters: Record<string, unknown> = {};
  @Output() applyFilters = new EventEmitter<Record<string, unknown>>();

  constructor() { }

  ngOnInit(): void {
  }

  updateTechnologies(event: string[]): void {
    this.filters = {...this.filters, technologies: event};
  }

  updateTMC(event: string[]): void {
    this.filters = {...this.filters, tmc: event};
  }

  applyButtonClick(): void {
    this.applyFilters.emit(this.filters);
  }

}
