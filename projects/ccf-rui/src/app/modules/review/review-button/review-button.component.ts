import { Component, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ReviewModalComponent } from '../review-modal/review-modal.component';

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
   * Opens the info dialogue with the project details
   */
  launchReviewModal(): void {
    this.dialog.open(ReviewModalComponent, {
      width: '60em',
      data: {}
    });
  }
}
