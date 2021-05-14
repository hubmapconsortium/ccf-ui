import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationContent } from '../registration-content/registration-content.component';


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

