import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Component containing the gender and slide sliders
 */
@Component({
  selector: 'ccf-labeled-side-toggle',
  templateUrl: './labeled-side-toggle.component.html',
  styleUrls: ['./labeled-side-toggle.component.scss']
})

export class LabeledSideToggleComponent {

  /**
   * Disables the gender silder if not applicable to currently selected organ
   */
  @Input() genderDisabled = false;

  /**
   * Disables the side silder if not applicable to currently selected organ
   */
  @Input() sideDisabled = false;

  /**
   * Input to determine if 'Male' is selected
   */
  @Input() isMale = true;

  /**
   * Input to determine if 'L' is selected
   */
  @Input() left = false;

  /**
   * Emits the currently selected gender
   */
  @Output() genderChanged = new EventEmitter<string>();

  /**
   * Emits the currently selected side
   */
  @Output() sideChanged = new EventEmitter<string>();

  /**
   * Updates and emits the currently selected gender
   * @param selection The current toggle state
   */
  updateGender(selection: boolean): void {
    this.isMale = !selection;
    this.genderChanged.emit(this.isMale ? 'male' : 'female');
  }

  /**
   * Updates and emits the currently selected side
   * @param selection The current toggle state
   */
  updateSide(selection: boolean): void {
    this.left = selection;
    this.sideChanged.emit(this.left ? 'left' : 'right');
  }

}
