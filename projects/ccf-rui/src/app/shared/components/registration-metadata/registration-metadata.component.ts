import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModelState } from '../../../core/store/model/model.state';
import { PageState, Person } from '../../../core/store/page/page.state';
import { RegistrationState } from '../../../core/store/registration/registration.state';

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
  /**
   * Name valid of registration metadata component
   */
  nameValid: boolean;

  /**
   * Text to inform user if a registration file has been uploaded
   */
  uploadText: string;

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
    });
    registration.state$.subscribe(reg => {
      this.uploadText = reg.initialRegistration ? 'File(s) uploaded' : 'No file(s) uploaded';
    });
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
