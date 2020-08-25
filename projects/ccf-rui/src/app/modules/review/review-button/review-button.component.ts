import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ReviewModalComponent } from '../review-modal/review-modal.component';
import { RegistrationData } from '../../../core/models/registration-data';


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
  @Input() registrationData: RegistrationData = {
    firstName: 'Homer',
    lastName: 'Simpson',
    referenceOrgan: 'kidney, left, make, vh',
    tissueBlockSize: '20, 10, 10',
    tissueBlockPosition: '10, 74, 16',
    tissueBlockRotation: '0, 358.75, 20.07',
    extractionSites: 'Bisection line',
    anatomicalStructureTags: 'Tag 1, Tag 2, Tag 3',
    timestamp: '7/10/2020 9:53:04 AM',
    alignmentID: '5dae2c44-aad-5-4f7a-aa12-c0551de97b'
  };

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
        registrationData: this.registrationData
      }
    });

    dialogRef?.afterClosed().subscribe(
      data => {
        if (data) {
          this.registerData.emit();
        }
      }
    );
  }
}
