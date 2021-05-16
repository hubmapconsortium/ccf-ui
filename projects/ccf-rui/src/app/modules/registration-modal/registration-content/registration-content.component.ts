import { Component, HostBinding } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PageState, Person } from '../../../core/store/page/page.state';
import { ModelState, RUI_ORGANS } from '../../../core/store/model/model.state';
import { map } from 'rxjs/operators';
import { OrganInfo } from 'ccf-shared';


/**
 * Component containing content of the initial registration modal
 */
@Component({
  selector: 'ccf-registration-content',
  templateUrl: 'registration-content.component.html',
  styleUrls: ['./registration-content.component.scss']
})
export class RegistrationContentComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-registration-content';

  /** Current sex in the model state */
  readonly sexByLabel$ = this.model.sex$.pipe(
    map(sex => sex === 'female' ? 'Female' : 'Male')
  );

  /** HTML class name */
  organList = RUI_ORGANS;

  /** HTML class name */
  sexSelected: boolean;

  /** Whether  an organ has been selected */
  organSelected: boolean;

  /** Current sex selected */
  currentSex: string;

  /** Current organ selected */
  currentOrgan: OrganInfo;

  nameValid: boolean;

  /**
   * Creates an instance of the registration dialog
   * 
   * @param page Page state
   * @param model Model state
   * @param registration Registration state
   * @param dialogRef Registration dialog
   */
  constructor(
    readonly page: PageState,
    readonly model: ModelState,
    public dialogRef: MatDialogRef<RegistrationContentComponent>
  ) {
    dialogRef.disableClose = true;
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
  registerButtonClick(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    if (!this.organSelected || !this.nameValid) {
      return;
    }
    this.closeDialog();
  }

  /**
   * Closes the dialog and sets the correct sex and organ in the model state
   * Updates page state to signal registration has started
   */
  closeDialog(): void {
    this.model.setSex(this.currentSex === 'Female' ? 'female' : 'male');
    this.model.setOrgan(this.currentOrgan);
    this.dialogRef.close(true);
    this.page.registrationStarted();
  }
}
