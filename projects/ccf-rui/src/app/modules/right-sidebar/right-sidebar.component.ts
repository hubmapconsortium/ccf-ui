import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';

import { ModelState } from '../../core/store/model/model.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { PageState, Person } from '../../core/store/page/page.state';
import { AnatomicalStructureTagState } from '../../core/store/anatomical-structure-tags/anatomical-structure-tags.state';
import { OrganInfo } from 'ccf-shared';


/**
 * The right sidebar
 */
@Component({
  selector: 'ccf-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSidebarComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-right-sidebar';

  /** Whether or not the initial registration modal has been closed */
  @Input() modalClosed = false;

  nameValid: boolean;

  currentSex: string;

  sexSelected: boolean;

  organList: OrganInfo[];

  /**
   * Creates an instance of right sidebar component.
   *
   * @param model Model state service
   * @param registration Registration state service
   * @param page The page state
   * @param astags The anatomical structure tags state
   */
  constructor(
    readonly model: ModelState,
    readonly registration: RegistrationState,
    readonly page: PageState,
    readonly astags: AnatomicalStructureTagState,
    cdr: ChangeDetectorRef
  ) {
    page.user$.subscribe(user => {
      this.checkNameValid(user);
      cdr.markForCheck();
    });
    page.organOptions$.subscribe((options: OrganInfo[]) => {
      this.organList = options;
    });
  }

  checkNameValid(event: Pick<Person, 'firstName' | 'lastName'>): void {
    this.nameValid = event.firstName.length > 0 && event.lastName.length > 0;
  }

  setSexFromLabel(label: 'Female' | 'Male'): void {
    this.currentSex = label;
    this.model.setSex(label.toLowerCase() as 'male' | 'female');
    this.sexSelected = true;
  }
}
