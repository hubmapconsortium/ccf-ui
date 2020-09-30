import { Component, HostBinding, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
export class ReviewButtonComponent implements OnInit {
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

  @Input() displayErrors = true;

  @Input() registrationIsValid = false;

  /**
   * Output that emits when the modal's register button was clicked
   */
  @Output() registerData = new EventEmitter<void>();

  @Output() enterErrorMode = new EventEmitter<void>();

  get disabled(): boolean {
    return this.displayErrors && !this.registrationIsValid;
  }

  ngOnInit(): void {
    console.log('disabled: ', this.displayErrors, '\nisValid: ', this.registrationIsValid);
  }

  /**
   * Opens the info dialogue with the project details
   */
  launchReviewModal(): void {
    this.enterErrorMode.emit();
    if (!this.registrationIsValid) {
      return;
    }

    const dialogRef = this.dialog.open(ReviewModalComponent, {
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
