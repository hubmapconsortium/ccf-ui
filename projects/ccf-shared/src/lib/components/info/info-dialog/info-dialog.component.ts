import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentationContent } from '../info-button/info-button.service';

/**
 * Data model for the dialog input
 */
export interface InfoDialogData {
  content: DocumentationContent[];
  title: string;
}

/**
 * This component handles displaying and hiding a full screen modal / overlay that displays information about the project.
 */
@Component({
  selector: 'ccf-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {
  /**
   * Documentation contents
   */
  documentationContents: DocumentationContent[];
  /**
   * Title of the dialog
   */
  infoTitle: string;
  /**
   * Creates an instance of info dialog component.
   *
   * @param dialogRef A reference to the dialog that this component creates, used to call the dialog's methods
   * @param data Data being injected into the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InfoDialogData
  ) {
      this.documentationContents = data.content || [];
      this.infoTitle = data.title || '';
  }

  /**
   * Closes info dialog component
   */
  close(): void {
    document.getElementsByClassName('modal-animated')[0]?.classList.add('modal-animate-fade-out');

    setTimeout(()=>{
      this.dialogRef.close();
    }, 250);
  }
}
