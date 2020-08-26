import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { InfoDialogComponent } from '../info-dialog/info-dialog.component';


/**
 * Info button component: Information icon displays project details when clicked.
 */
@Component({
  selector: 'ccf-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.scss']
})
export class InfoButtonComponent {
  /**
   * Creates an instance of info button component.
   *
   * @param dialog Reference to the dialog creation service.
   */
  constructor(private readonly dialog: MatDialog) { }

  /**
   * Opens the info dialogue with the project details
   */
  launchInfoDialog(): void {
    this.dialog.open(InfoDialogComponent, {
      width: '60em',
      backdropClass: 'modal-backdrop-dark',
      data: {}
    });
  }
}
