import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModelState } from '../../../core/store/model/model.state';
import { PageState, Person } from '../../../core/store/page/page.state';
import { RegistrationState } from '../../../core/store/registration/registration.state';

@Component({
  selector: 'ccf-registration-metadata',
  templateUrl: './registration-metadata.component.html',
  styleUrls: ['./registration-metadata.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RegistrationMetadataComponent {
  nameValid: boolean;

  uploadText: string;

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

  checkNameValid(event: Pick<Person, 'firstName' | 'lastName'>): void {
    this.nameValid = event.firstName.length > 0 && event.lastName.length > 0;
  }

  setSexFromLabel(label: 'Female' | 'Male'): void {
    this.model.setSex(label.toLowerCase() as 'male' | 'female');
  }
}
