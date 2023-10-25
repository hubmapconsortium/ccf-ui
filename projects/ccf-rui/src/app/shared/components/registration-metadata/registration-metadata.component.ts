import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { ModelState } from '../../../core/store/model/model.state';
import { PageState, Person } from '../../../core/store/page/page.state';
import { RegistrationState } from '../../../core/store/registration/registration.state';
import { FormControl, Validators } from '@angular/forms';

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
  @Output() readonly orcidValid = new EventEmitter<boolean>();

  @Output() readonly registrationSelected = new EventEmitter<void>();

  /**
   * Name valid of registration metadata component
   */
  nameValid: boolean;

  orcId?: string;

  /**
   * Text to inform user if a registration file has been uploaded
   */
  uploadText: string;

  orcidControl = new FormControl('', [Validators.pattern('^\\d{4}-\\d{4}-\\d{4}-\\d{4}$')]);

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

  getErrorMessage() {
    return this.orcidControl.hasError('pattern') ? 'Not a valid ORCID' : '';
  }

  updateOrcid(value: string): void {
    this.page.setOrcidId(value);
  }

  /**
   * Checks to see if a first and last name has been entered
   *
   * @param event Name input event
   */
  checkNameValid(event: Pick<Person, 'firstName' | 'lastName'>): void {
    this.nameValid = event.firstName.length > 0 && event.lastName.length > 0;
  }

  /**
   * Updates current sex selected
   *
   * @param label Sex selected
   */
  setSexFromLabel(label: 'Female' | 'Male'): void {
    this.model.setSex(label.toLowerCase() as 'male' | 'female');
  }
}
