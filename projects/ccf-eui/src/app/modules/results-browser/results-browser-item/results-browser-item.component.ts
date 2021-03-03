import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListResult } from 'ccf-database';


/**
 * Component in charge of rendering the individual result browser items that are
 * used in the ResultsBrowserComponent.
 */
@Component({
  selector: 'ccf-results-browser-item',
  templateUrl: './results-browser-item.component.html',
  styleUrls: ['./results-browser-item.component.scss']
})
export class ResultsBrowserItemComponent {
  /**
   * Input object containing the label, download, click action,
   * and image information for the component.
   */
  @Input() data: ListResult;

  /**
   * Output used to pass up the intent to open the ImageViewer
   */
  @Output() openImageViewer = new EventEmitter();

  /**
   * Decided which action to take based on the result's resultType property
   *
   * @param result the result which was clicked on
   */
  openResult(): void {
    switch (this.data.resultType) {
      case ('external_link'): {
        // Open link in new tab
        window.open(this.data.resultUrl, '_blank');
        break;
      }
      case ('local_link'): {
        // Open link in current tab
        window.open(this.data.resultUrl, '_self');
        break;
      }
      default: {
        // When no resultType is set, image viewer is the default
        this.openImageViewer.emit();
        break;
      }
    }
  }
}
