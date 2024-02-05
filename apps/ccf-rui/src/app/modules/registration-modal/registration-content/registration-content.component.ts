import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrganInfo } from 'ccf-shared';
import { map } from 'rxjs/operators';

import { ModelState, RUI_ORGANS } from '../../../core/store/model/model.state';
import { PageState, Person } from '../../../core/store/page/page.state';


/**
 * Component containing content of the initial registration modal
 */
@Component({
  selector: 'ccf-registration-content',
  templateUrl: './registration-content.component.html',
  styleUrls: ['./registration-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationContentComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-registration-content';

  /** Current sex in the model state */
  readonly sexByLabel$ = this.model.sex$.pipe(
    map(sex => sex === 'female' ? 'Female' : 'Male')
  );

  /** List of selectable organs */
  organList = RUI_ORGANS;

  /** Whether sex has been selected */
  sexSelected!: boolean;

  /** Whether an organ has been selected */
  organSelected!: boolean;

  /** Current sex selected */
  currentSex!: string;

  /** Current organ selected */
  currentOrgan!: OrganInfo;

  /** Checks if the user has entered a first and last name */
  nameValid!: boolean;

  /** Checks if the entered orcid is valid */
  orcidValid!: boolean;

  /** Checks if a preexisting registration was uploaded */
  registrationSelected: boolean;

  /**
   * Creates an instance of the registration dialog
   *
   * @param page Page state
   * @param model Model state
   * @param dialogRef Registration dialog
   * @param cdr Change detection
   */
  constructor(
    readonly page: PageState,
    readonly model: ModelState,
    public dialogRef: MatDialogRef<RegistrationContentComponent>,
    cdr: ChangeDetectorRef
  ) {
    this.registrationSelected = false;
    page.user$.subscribe(user => {
      this.checkNameValid(user);
      this.orcidValid = page.isOrcidValid();
      cdr.markForCheck();
    });
    model.organ$.subscribe(organ => {
      this.organSelected = organ.src !== '';
      cdr.markForCheck();
    });
    this.sexByLabel$.subscribe(sex => {
      this.setSexFromLabel(sex);
      cdr.markForCheck();
    });
    dialogRef.disableClose = true;
    this.page.organOptions$.subscribe((options) => {
      this.organList = options as OrganInfo[];
      cdr.markForCheck();
    });
  }

  /**
   * Updates current sex selected
   *
   * @param label Sex selected
   */
  setSexFromLabel(label: 'Female' | 'Male'): void {
    this.currentSex = label;
    this.sexSelected = true;
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
   * Updates current organ selected
   *
   * @param organ Organ selected
   */
  organSelect(organ: OrganInfo): void {
    this.currentOrgan = organ;
    this.organSelected = true;
  }

  /**
   * Handles button click
   *
   * @param [event] The click event
   * @returns  Returns nothing is no organ is selected
   */
  registerButtonClick(event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }
    if (!this.organSelected || !this.nameValid) {
      return;
    }
    this.closeDialog();
  }

  /**
   * Sets registrationSelected to true when a registration is uploaded
   */
  handleRegistrationSelect() {
    this.registrationSelected = true;
  }

  /**
   * Closes the dialog and sets the correct sex and organ in the model state
   * Sets block to default position and rotation if user didn't select a registration
   * Updates page state to signal registration has started
   */
  closeDialog(): void {
    this.model.setSex(this.currentSex === 'Female' ? 'female' : 'male');
    this.model.setOrgan(this.currentOrgan);
    if (!this.registrationSelected) {
      this.model.setOrganDefaults();
    }
    this.dialogRef.close(true);
    this.page.registrationStarted();
  }
}
