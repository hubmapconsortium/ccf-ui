import { Component, Inject, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MetaData } from '../../../core/models/meta-data';

/**
 * The expected format of the review modal's data input.
 */
interface ReviewModalData {
  /** The object containing all of the review information for displaying inside the modal */
  metaData: MetaData;

  /** Whether or not the cancel registration callback is set */
  registrationCallbackSet: boolean;
}

/**
 * Modal for reviewing the registration
 */
@Component({
  selector: 'ccf-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewModalComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-review-modal';
  /**
   * Whether or not the cancel registration callback is set
   */
  registrationCallbackSet: boolean;

  /**
   * The object containing all of the review information for displaying inside the modal
   */
  metaData: MetaData;

  /**
   * Creates an instance of the review modal component.
   *
   * @param dialogRef A reference to the dialog that this component creates, used to call the dialog's methods
   * @param data Data being injected into the dialog
   */
  constructor(
    public dialogRef: MatDialogRef<ReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewModalData
  ) {
    this.metaData = data.metaData;
    this.registrationCallbackSet = data.registrationCallbackSet;
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
