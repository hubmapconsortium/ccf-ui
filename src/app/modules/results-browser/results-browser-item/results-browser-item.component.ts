import { Component, Input } from '@angular/core';
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
}
