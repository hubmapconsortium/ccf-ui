import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ModelState } from '../../../core/store/model/model.state';
import { OrganInfo } from 'ccf-shared';
import { AnatomicalStructureTagState } from '../../../core/store/anatomical-structure-tags/anatomical-structure-tags.state';
import { PageState, Person } from '../../../core/store/page/page.state';
import { RegistrationState } from '../../../core/store/registration/registration.state';
import { SpatialEntityJsonLd } from 'ccf-body-ui';

@Component({
  selector: 'ccf-registration-metadata-module',
  templateUrl: './registration-metadata-module.component.html',
  styleUrls: ['./registration-metadata-module.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class RegistrationMetadataModuleComponent {
  nameValid: boolean;

  currentSex?: string;

  sexSelected: boolean;

  organList: OrganInfo[];

  orcidId?: string;

  fileUploaded = false;

  constructor(
    readonly model: ModelState,
    readonly registration: RegistrationState,
    readonly page: PageState,
    readonly astags: AnatomicalStructureTagState,
    cdr: ChangeDetectorRef
  ) {
    page.user$.subscribe(user => {
      this.checkNameValid(user);
      this.orcidId = user.orcidId;
      cdr.markForCheck();
    });
    page.organOptions$.subscribe((options: OrganInfo[]) => {
      this.organList = options;
      cdr.markForCheck();
    });
    model.sex$.subscribe(sex => {
      this.currentSex = sex;
      cdr.markForCheck();
    });
    registration.state$.subscribe(reg => {
      this.fileUploaded = !!reg.initialRegistration;
    });
  }

  get uploadedText(): string {
    return this.fileUploaded ? 'File(s) uploaded' : 'No file(s) uploaded';
  }

  checkNameValid(event: Pick<Person, 'firstName' | 'lastName'>): void {
    this.nameValid = event.firstName.length > 0 && event.lastName.length > 0;
  }

  setSexFromLabel(label: 'Female' | 'Male'): void {
    this.currentSex = label;
    this.model.setSex(label.toLowerCase() as 'male' | 'female');
    this.sexSelected = true;
  }

  updateOrcid(input: InputEvent): void {
    this.orcidId = (input.target as HTMLInputElement).value;
    this.page.setOrcidId(this.orcidId);
  }

  updateRegistration(event: SpatialEntityJsonLd): void {
    this.registration.patchState({ initialRegistration: event });
    this.registration.editRegistration(event);
  }

}
