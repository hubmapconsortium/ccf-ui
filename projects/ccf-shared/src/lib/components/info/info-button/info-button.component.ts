import { Component, OnDestroy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentationContent } from '../info-button/info-button.service';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { InfoButtonService } from './info-button.service';

/**
 * Info button component: Information icon displays project details when clicked.
 */
@Component({
  selector: 'ccf-info-button',
  templateUrl: './info-button.component.html',
  styleUrls: ['./info-button.component.scss']
})
export class InfoButtonComponent implements OnDestroy {
  /**
   * Title of the info dialog
   */
  @Input() infoTitle = '';

  /**
   * Creates an instance of info button component.
   *
   * @param dialog Reference to the dialog creation service.
   * @param infoButtonService Reference to the info button service
   */
  constructor(private readonly dialog: MatDialog, private readonly infoButtonService: InfoButtonService) {
    infoButtonService.markdownContent.subscribe(data => {
      if(data.length) {
        this.launchInfoDialog(data);
      }
    });
   }

   /**
    * Unsubscribe to the observable when the component
    * is destroyed
    */
   ngOnDestroy(): void {
     this.infoButtonService.markdownContent.unsubscribe();
   }

  /**
   * Opens the info dialogue with the project details
   */
  launchInfoDialog(data: DocumentationContent[]): void {
    this.dialog.open(InfoDialogComponent, {
      panelClass: 'modal-animated',
      width: '60rem',
      data: {
        title: this.infoTitle,
        content: data
      }
    });
  }

  /**
   * Detects button click and reads markdown function
   */
  onDialogButtonClick(): void {
    this.infoButtonService.readMarkdown();
  }
}
