import { Component, EventEmitter, Output } from '@angular/core';

// import { SearchService } from '../../shared/services/search/search.service';

export type Genders = 'Both' | 'Male' | 'Female';

@Component({
  selector: 'ccf-gender-selector',
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.scss']
})
export class GenderSelectorComponent {
  @Output() readonly genderChange = new EventEmitter<Genders>();

  genders: Genders[] = ['Both', 'Male', 'Female'];
  selected: Genders = 'Both';

  // constructor(private search: SearchService) { }

  selectionChanged(value: Genders) {
    this.selected = value;
    this.genderChange.emit(value);
    // console.log(this.selected);
    // this.search.setGender(gender);
  }
}
