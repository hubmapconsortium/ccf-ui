import { Component, HostBinding, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageState } from '../../core/store/page/page.state';
import { ModelState, RUI_ORGANS } from '../../core/store/model/model.state';
import { map } from 'rxjs/operators';
import { OrganInfo } from 'ccf-shared';

@Component({
  selector: 'ccf-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss']
})
export class RegistrationModalComponent implements OnInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-registration-modal';

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.openDialog();
  }

  openDialog() {
    this.dialog.open(RegistrationContent, {
      autoFocus: false
    });
  }
}

@Component({
  selector: 'ccf-registration-content',
  templateUrl: 'registration-content.html',
  styleUrls: ['./registration-content.scss']
})
export class RegistrationContent {

  organList = RUI_ORGANS;

  sexSelected: boolean;

  organSelected: boolean;

  currentSex: string;

  currentOrgan: OrganInfo;

  @Output() modalClose = new EventEmitter<void>();

  constructor(
    readonly page: PageState,
    readonly model: ModelState,
    public dialogRef: MatDialogRef<RegistrationContent>
  ) {
    dialogRef.disableClose = true;
  }

  readonly sexByLabel$ = this.model.sex$.pipe(
    map(sex => sex === 'female' ? 'Female' : 'Male')
  );

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
    this.modalClose.emit();
  }
}
