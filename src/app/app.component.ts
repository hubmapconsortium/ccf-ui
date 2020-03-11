import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './modules/info-dialog/info-dialog.component';

@Component({
  selector: 'ccf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  launchInfoDialog():void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '250px',
      data: {}
    });
  }
}
