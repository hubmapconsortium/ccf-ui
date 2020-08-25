import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

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
   * Current user name
   */
  @Input() name: UserName = {
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
