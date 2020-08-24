import { Component, Inject, HostBinding, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewObject } from '../../../core/models/review-object';

/**
 * The expected format of the review modal's data input.
 */
interface ReviewModalData {
  embeddedMode: boolean;
  reviewObject: ReviewObject;
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
   * Whether or not the application is in embedded mode or not
   */
  embeddedMode: boolean;

  /**
   * The object containing all of the review information for displaying inside the modal
   */
  reviewObject: ReviewObject;

  /**
   * Creates an instance of the review modal component.
   * @param dialogRef A reference to the dialog that this component creates, used to call the dialog's methods
   * @param data Data being injected into the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<ReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewModalData
  ) {
    this.embeddedMode = data.embeddedMode;
    this.reviewObject = data.reviewObject;
  }

  /**
   * Closes info dialog component
   */
  close(): void {
    this.dialogRef.close(false);
  }
}
