import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Info button component: Information icon displays project details when clicked.
 */
@Component({
  selector: 'ccf-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallToActionComponent {
  /**
   * Title of the info dialog
   */
  @Input() infoTitle: string;

  /**
   * Whether the information is for the RUI or EUI
   */
  @Input() imageUrl: string;

  /**
   * Message to be displayed under image
   */
  @Input() message: string;

  /**
   * Label for the button
   */
  @Input() callToAction: string;


  /**
  *  Emmitter for component to pass info to parent
  * */
  @Output() readonly callToActionClicked = new EventEmitter<void>();


  /**
  *  Emmitter for component to pass info to parent
  * */
  @Output() readonly closeClicked = new EventEmitter<void>();



  /**
   * Function to handle the close button click action
   */
  close(): void {
    this.closeClicked.emit();
  }


  /**
   * Detects button click and reads markdown function
   */
  onDialogButtonClick(): void {
    this.callToActionClicked.emit();
  }
}
