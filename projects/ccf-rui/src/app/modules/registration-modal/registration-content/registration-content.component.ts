import { Component, HostBinding } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { PageState } from '../../../core/store/page/page.state';
import { ModelState, RUI_ORGANS } from '../../../core/store/model/model.state';
import { map } from 'rxjs/operators';
import { OrganInfo } from 'ccf-shared';


@Component({
  selector: 'ccf-registration-content',
  templateUrl: 'registration-content.component.html',
  styleUrls: ['./registration-content.component.scss']
})
export class RegistrationContentComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-registration-content';

  readonly sexByLabel$ = this.model.sex$.pipe(
    map(sex => sex === 'female' ? 'Female' : 'Male')
  );

  organList = RUI_ORGANS;

  sexSelected: boolean;

  organSelected: boolean;

  currentSex: string;

  currentOrgan: OrganInfo;

  constructor(
    readonly page: PageState,
    readonly model: ModelState,
    public dialogRef: MatDialogRef<RegistrationContentComponent>
  ) {
    dialogRef.disableClose = true;
  }

  setSexFromLabel(label: 'Female' | 'Male'): void {
    this.currentSex = label;
    this.sexSelected = true;
  }

  organSelect(organ: OrganInfo): void {
    this.organSelected = true;
    this.currentOrgan = organ;
  }

  registerButtonClick(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    if (!this.organSelected) {
      return;
    }
    this.model.setSex(this.currentSex === 'Female' ? 'female' : 'male');
    this.model.setOrgan(this.currentOrgan);
    this.dialogRef.close(true);
    this.page.registrationStarted();
  }
}
