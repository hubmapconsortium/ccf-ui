import { Component, Inject, HostBinding, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ReviewObject {
  firstName: string;
  lastName: string;
  referenceOrgan: string;
  tissueBlockSize: string;
  tissueBlockPosition: string;
  tissueBlockRotation: string;
  extractionSites: string;
  anatomicalStructureTags: string;
  currentDate: string;
  alignmentID: string;
}

@Component({
  selector: 'ccf-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-review-modal';

  /**
   * Creates an instance of the review modal component.
   * @param dialogRef A reference to the dialog that this component creates, used to call the dialog's methods
   * @param data Data being injected into the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<ReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: unknown
  ) { }

  @Input() reviewObject: ReviewObject = {
    firstName: 'Homer',
    lastName: 'Simpson',
    referenceOrgan: 'kidney, left, make, vh',
    tissueBlockSize: '20, 10, 10',
    tissueBlockPosition: '10, 74, 16',
    tissueBlockRotation: '0, 358.75, 20.07',
    extractionSites: 'Bisection line',
    anatomicalStructureTags: 'Tag 1, Tag 2, Tag 3',
    currentDate: '7/10/2020 9:53:04 AM',
    alignmentID: '5dae2c44-aad-5-4f7a-aa12-c0551de97b'
  };

  /**
   * Closes info dialog component
   */
  close(): void {
    this.dialogRef.close();
  }
}
