import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ReviewModalComponent } from '../review-modal/review-modal.component';
import { MetaData } from '../../../core/models/meta-data';


/**
 * Component to launch the ReviewModal component.
 */
@Component({
  selector: 'ccf-review-button',
  templateUrl: './review-button.component.html',
  styleUrls: ['./review-button.component.scss']
})
export class ReviewButtonComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-review-button';

  /**
   * Creates an instance of review button component.
   *
   * @param dialog Reference to the dialog creation service.
   */
  constructor(private readonly dialog: MatDialog) { }

  /**
   * Input to set whether the component should be in register (true) or download (false) mode
   */
  @Input() embeddedMode = true;

  /**
   * Input object of information to display in the modal
   */
  @Input() metaData: MetaData = [
    { label: 'First Name', value: 'Homer' },
    { label: 'Last Name', value: 'Simpson' },
    { label: 'Reference Organ Name', value: 'kidney, left, make, vh' },
    { label: 'Tissue Block Size (mm)', value: '20, 10, 10' },
    { label: 'Tissue Block Position (mm)', value: '10, 74 16' },
    { label: 'Tissue Block Rotation', value: '0, 358.75, 20.07' },
    { label: 'Extraction Site(s)', value: 'Bisection line' },
    { label: 'Anatomical Structure Tags', value: 'Tag 1, Tag 2, Tag 3' },
    { label: 'Time Stamp', value: '7/10/2020 9:53:04 AM' },
    { label: 'Alignment ID', value: '5dae2c44-aad-5-4f7a-aa12-c0551de97b' }
  ];

  /**
   * Output that emits when the modal's register button was clicked
   */
  @Output() registerData = new EventEmitter<void>();

  /**
   * Opens the info dialogue with the project details
   */
  launchReviewModal(): void {
    const dialogRef = this.dialog.open(ReviewModalComponent, {
      width: '60em',
      data: {
        embeddedMode: this.embeddedMode,
        metaData: this.metaData
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.registerData.emit();
        }
      }
    );
  }
}
