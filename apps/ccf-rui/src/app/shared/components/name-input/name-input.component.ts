/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/**
 * User name data
 */
export interface UserName {
  /**
   * User's first name
   */
  firstName: string;

  /**
   * User's middle name
   */
  middleName: string;

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
  styleUrls: ['./name-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameInputComponent {
  /**
   * HTML class name
   */
  @HostBinding('class') readonly clsName = 'ccf-name-input';

  /**
   * Used to validate the first name input field.
   */
  firstNameValidator = new UntypedFormControl('', [Validators.required]);

  /**
   * Used to validate the last name input field.
   */
  lastNameValidator = new UntypedFormControl('', [Validators.required]);

  /**
   * Used to validate the middle name input field.
   */
  middleNameValidator = new UntypedFormControl('', [Validators.required]);


  /**
   * Current user name
   */
  @Input()
  get name(): UserName {
    return this._name;
  }

  set name(value: UserName) {
    this._name = value;
    this.firstNameValidator.setValue(value?.firstName || '');
    this.lastNameValidator.setValue(value?.lastName || '');
    this.middleNameValidator.setValue(value?.middleName || '');
  }

  private _name: UserName = {
    firstName: '',
    middleName: '',
    lastName: ''
  };

  /**
   * Emits a UserName object
   */
  @Output() readonly nameChange = new EventEmitter<UserName>();

  /**
   * Creates an instance of name input component.
   *
   * @param ga Analytics service
   */
  constructor(private readonly ga: GoogleAnalyticsService) { }

  /**
   * Updates username with a new entry and emits the UserName object
   *
   * @param input InputEvent from the input element which contains the new value
   * @param key firstName or lastName
   */
  updateName(input: Event, key: string): void {
    const inputTarget = input.target as HTMLInputElement;
    this.name = { ...this.name, [key]: inputTarget.value };
    this.ga.event('name_updated', 'name_input', key);
    this.nameChange.emit(this.name);
  }
}
