import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Slider for gender selection
 */
@Component({
  selector: 'ccf-gender-selector',
  templateUrl: './gender-selector.component.html',
  styleUrls: ['./gender-selector.component.scss']
})
export class GenderSelectorComponent {

  /**
   * Disables the silder if not applicable to currently selected organ
   */
  @Input() disabled = false;

  /**
   * Input to determine if 'Male' is selected
   */
  @Input() isMale = true;

  /**
   * Emits the currently selected gender
   */
  @Output() genderChanged = new EventEmitter<string>();

  /**
   * Updates and emits the currently selected gender
   * @param selection The current toggle state
   */
  updateGender(selection: boolean): void {
    this.isMale = !selection;
    this.genderChanged.emit(this.isMale ? 'male' : 'female');
  }

}
