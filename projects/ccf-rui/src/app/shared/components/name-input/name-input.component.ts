import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

/**
 * User name data
 */
export interface UserName {
  /**
   * User's first name
   */
  firstName: string;

  /**
   * User's last name
   */
  lastName: string;
}

/**
 * Component for inputting the researcher's name
 */
@Component({
  selector: 'ccf-name-input',
  templateUrl: './name-input.component.html',
  styleUrls: ['./name-input.component.scss']
})
export class NameInputComponent {
  /**
   * HTML class name
   */
  @HostBinding('class') readonly clsName = 'ccf-name-input';

  /**
   * Used to validate the first name input field.
   */
  firstNameValidator = new FormControl('', [Validators.required]);
  /**
   * Used to validate the last name input field.
   */
  lastNameValidator  = new FormControl('', [Validators.required]);

  /**
   * Current user name
   */
  // eslint-disable-next-line
  @Input()
  get name(): UserName {
    return this._name;
  }

  set name(value: UserName) {
    this._name = value;
    this.firstNameValidator.setValue(value?.firstName || '');
    this.lastNameValidator.setValue(value?.lastName || '');
  }

  private _name: UserName = {
    firstName: '',
    lastName: ''
  };

  /**
   * Emits a UserName object
   */
  @Output() readonly nameChange = new EventEmitter<UserName>();

  /**
   * Updates username with a new entry and emits the UserName object
   * @param input InputEvent from the input element which contains the new value
   * @param key firstName or lastName
   */
  updateName(input: InputEvent, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    this.name = { ...this.name, [key]: inputTarget.value };
    this.nameChange.emit(this.name);
  }
}
