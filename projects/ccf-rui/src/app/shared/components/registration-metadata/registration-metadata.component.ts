import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { ModelState } from '../../../core/store/model/model.state';
import { PageState, Person } from '../../../core/store/page/page.state';
import { RegistrationState } from '../../../core/store/registration/registration.state';
import { FormControl, Validators } from '@angular/forms';
import { SpatialEntityJsonLd } from 'ccf-body-ui';

/**
 * Right side registration menu
 */
@Component({
  selector: 'ccf-registration-metadata',
  templateUrl: './registration-metadata.component.html',
  styleUrls: ['./registration-metadata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RegistrationMetadataComponent {
  /** Emits when user has uploaded registration */
  @Output() readonly registrationSelected = new EventEmitter<void>();

  /** Checks if first and last name has been entered */
  nameValid: boolean;

  /** Orcid URI converted to regular id */
  orcId?: string;

  /** Text to inform user if a registration file has been uploaded */
  uploadText: string;

  /** Form control for validating orcid id */
  orcidControl = new FormControl('', [Validators.pattern('^[a-zA-Z0-9]{4}(-[a-zA-Z0-9]{4}){3}$')]);

  /**
   * Creates an instance of registration metadata component.
   * @param model Model state
   * @param registration Registration state
   * @param page Page state
   */
  constructor(
    readonly model: ModelState,
    readonly registration: RegistrationState,
    readonly page: PageState,
  ) {
    page.user$.subscribe(user => {
      this.checkNameValid(user);
      this.orcId = page.uriToOrcid(user.orcidId);
    });
    registration.state$.subscribe(reg => {
      this.uploadText = reg.initialRegistration ? 'File(s) uploaded' : 'No file(s) uploaded';
    });
  }

  /**
   * Error message to inform user if orcid is invalid
   * @returns Error message
   */
  getErrorMessage(): string {
    return this.orcidControl.hasError('pattern') ? 'Not a valid ORCID' : '';
  }

  /**
   * Updates orcid value
   * @param value Orcid value entered
   */
  updateOrcid(value: string): void {
    this.page.setOrcidId(value);
  }

  /**
   * Emits registrationSelected and calls editRegistration in state
   * @param event Registration uploaded
   */
  handleRegistrationUpload(reg: SpatialEntityJsonLd): void {
    this.registrationSelected.emit();
    this.registration.editRegistration(reg);
  }

  /**
   * Checks to see if a first and last name has been entered
   * @param event Name input event
   */
  checkNameValid(event: Pick<Person, 'firstName' | 'lastName'>): void {
    this.nameValid = event.firstName.length > 0 && event.lastName.length > 0;
  }

  /**
   * Updates current sex selected
   * @param label Sex selected
   */
  setSexFromLabel(label: 'Female' | 'Male'): void {
    this.model.setSex(label.toLowerCase() as 'male' | 'female');
  }
}
