import { Component, EventEmitter, HostBinding, Input, OnChanges, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

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
export class ReviewButtonComponent implements OnChanges {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-review-button';

  /**
   * Input to set whether the component should be in register (true) or download (false) mode
   */
  @Input() registrationCallbackSet = true;

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
   * Creates an instance of review button component.
   *
   * @param dialog Reference to the dialog creation service.
   * @param ga Analytics service
   */
  constructor(private readonly dialog: MatDialog, private readonly ga: GoogleAnalyticsService) { }

  /**
   * Updates the value of registrationIsValid based on the
   * meta data.
   */
  ngOnChanges() {
    this.registrationIsValid = Boolean(this.metaData[0].value && this.metaData[1].value && this.metaData[2].value);
  }

  /**
   * Decides whether or not the download / register button should
   * be disabled.
   */
  get disabled(): boolean {
    return !this.registrationIsValid;
  }

  /**
   * Handles the click action for the register button.
   */
  registerButtonClick(event?: MouseEvent): false {
    if (event) {
      event.preventDefault();
    }
    this.enterErrorMode.emit();
    if (this.registrationIsValid) {
      this.ga.event('review_start', 'review_button');
      this.launchReviewModal();
    }
    return false;
  }

  /**
   * Opens the info dialogue with the project details
   */
  launchReviewModal(): void {
    const dialogRef = this.dialog.open(ReviewModalComponent, {
      panelClass: 'modal-animated',
      width: '60rem',
      data: {
        registrationCallbackSet: this.registrationCallbackSet,
        metaData: this.metaData
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.ga.event('register', 'review_button');
          this.registerData.emit();
        }
      }
    );
  }
}
