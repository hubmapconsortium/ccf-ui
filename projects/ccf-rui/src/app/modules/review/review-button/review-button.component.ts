import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MetaData } from '../../../core/models/meta-data';
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
   * Input to set whether the component should be in register (true) or download (false) mode
   */
  @Input() embeddedMode = true;

  /**
   * Input object of information to display in the modal
   */
  @Input() metaData: MetaData = [];

  /**
   * Whether or not the app is currently displaying errors
   * Decides how the button should be styled
   */
  @Input() displayErrors = true;

  /**
   * Whether or not all the necessary data has been inputted from
   * the user.  Decides whether or not to let the user open the
   * registration / download modal
   */
  @Input() registrationIsValid = false;

  /**
   * Output that emits when the modal's register button was clicked
   */
  @Output() registerData = new EventEmitter<void>();

  /**
   * Turns on the 'error mode' for the application.
   * Used to begin showing the user what they need to
   * do to be able to register / download.
   */
  @Output() enterErrorMode = new EventEmitter<void>();

  /**
   * Decides whether or not the download / register button should
   * be disabled.
   */
  get disabled(): boolean {
    return this.displayErrors && !this.registrationIsValid;
  }

  /**
   * Handles the click action for the register button.
   */
  registerButtonClick(): void {
    this.enterErrorMode.emit();
    if (!this.registrationIsValid) {
      return;
    }

    this.launchReviewModal();
  }

  /**
   * Opens the info dialogue with the project details
   */
  launchReviewModal(): void {
    const dialogRef = this.dialog.open(ReviewModalComponent, {
      panelClass: 'modal-animated',
      width: '60rem',
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
