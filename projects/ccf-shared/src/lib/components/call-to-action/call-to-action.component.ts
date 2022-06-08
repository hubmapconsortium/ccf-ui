import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';

/**
 * Info button component: Information icon displays project details when clicked.
 */
@Component({
  selector: 'ccf-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss']
})
export class CallToActionComponent {
  /**
   * Title of the info dialog
   */
  @Input() infoTitle: string = 'New To The Exploration User Interface';

  /**
   * Whether the information is for the RUI or EUI
   */
   @Input() imageUrl: string = "https://i.stack.imgur.com/ORKiT.jpg";  

  /**
   * Message to be displayed under image
   */
  @Input() message: string = 'Spatial Search has Arrived!'

  /**
   * Label for the button 
   */
  @Input() callToAction: string = 'Learn More'


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
    console.log('GO TO DIALOG')
    //this.infoButtonService.readMarkdown();
    
  }
  
}
