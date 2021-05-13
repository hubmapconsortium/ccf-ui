import { Component, HostBinding, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
    this.dialog.open(RegistrationContent);
  }

}

@Component({
  selector: 'ccf-registration-content',
  templateUrl: 'registration-content.html',
  styleUrls: ['./registration-content.scss']
})
export class RegistrationContent {}
