import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ListResult } from 'ccf-database';
import { whitelistDomains } from './whitelist.data';


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
    if(this.checkURL(this.data.resultUrl || '')) {
      this.openImageViewer.emit();
    } else {
     // Open link in new tab
      window.open(this.data.resultUrl, '_blank');
    }
  }

  checkURL(resultUrl: string): boolean {
    for(let url of whitelistDomains) {
      if (resultUrl.startsWith(url)) {
        return true;
      }
    }
    return false;
  }
}
