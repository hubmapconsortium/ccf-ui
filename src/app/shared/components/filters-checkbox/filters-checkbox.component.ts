import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Filter } from '../../models/filters';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'ccf-filters-checkbox',
  templateUrl: './filters-checkbox.component.html',
  styleUrls: ['./filters-checkbox.component.scss']
})
export class FiltersCheckboxComponent implements OnInit {
  @Input() filter: Filter;
  @Output() updateFilter: EventEmitter<Filter> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  filterOnChange(event: MatCheckboxChange, index: number): void{
    const checked = event.checked;
    const selectedOption = this.filter.options[index];

    if(checked) {
      this.filter.selection.push(selectedOption);
    } else {
      const filteredSelection = this.filter.selection.filter((choice: string | number) =>  {
        return (choice !== selectedOption)
      });
      this.filter.selection = filteredSelection;
    }

    this.updateFilter.emit(this.filter);
  }
}
