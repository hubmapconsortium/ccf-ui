import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ccf-gender-selector',
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.scss']
})
export class GenderSelectorComponent {

  @Input() isMale = true;
  @Output() genderChanged = new EventEmitter<string>();

  constructor() { }

  updateGender(selection: boolean): void {
    this.isMale = !selection;
    this.genderChanged.emit(this.isMale ? 'male' : 'female');
  }

}
