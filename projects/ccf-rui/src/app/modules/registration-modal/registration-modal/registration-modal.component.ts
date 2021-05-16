import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationContentComponent } from '../registration-content/registration-content.component';


@Component({
  selector: 'ccf-registration-modal',
  templateUrl: './registration-modal.component.html'
})
export class RegistrationModalComponent implements OnInit {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-registration-modal';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(RegistrationContentComponent, {
      autoFocus: false
    });
  }
}

