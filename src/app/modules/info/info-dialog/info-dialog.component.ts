import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ccf-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss']
})
export class InfoDialogComponent {
/**
 * Creates an instance of info dialog component.
 * @param dialogRef Dialog reference
 * @param data Dialog data
 */
constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown) { }

  /**
   * Closes info dialog component
   */
  close(): void {
    this.dialogRef.close();
  }
}
