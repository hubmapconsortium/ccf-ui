import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { InfoButtonService } from './info-button.service';
import { DocumentationContent } from '../../../core/models/documentation';


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
   * @param infoButtonService Reference to the info button service
   */
  constructor(private readonly dialog: MatDialog, private infoButtonService: InfoButtonService) {
    infoButtonService.markdownContent.subscribe(data => {
      if(data.length) { this.launchInfoDialog(data); }
    });
   }

  /**
   * Opens the info dialogue with the project details
   */
  launchInfoDialog(data: DocumentationContent[]): void {
    this.dialog.open(InfoDialogComponent, {
      panelClass: 'modal-animated',
      width: '60rem',
      data
    });
  }

  /**
   * Detects button click and reads markdown function
   */
  onDialogButtonClick(): void {
    this.infoButtonService.readMarkdown();
  }
}
