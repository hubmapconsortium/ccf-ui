import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';


@Component({
  selector: 'ccf-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.scss']
})
export class InfoButtonComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  launchInfoDialog():void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '60em',
      data: {}
    });
  }

}
