import { Component } from '@angular/core';

import { ImageViewerData } from 'ccf-database';

/**
 * Popup that displays detailed information on a selected image along with viewing options
 */
@Component({
  selector: 'ccf-image-viewer-popover',
  templateUrl: './image-viewer-popover.component.html',
  styleUrls: ['./image-viewer-popover.component.scss']
})
export class ImageViewerPopoverComponent {

  data: ImageViewerData = {
    '@id': '',
    '@type': 'ImageViewerData',
    id: '',
    label: '',
    organName: '',
    metadata: [{label: '', value: ''}]
  };

  /**
   * Whether or not the image viewer is visible
   */
  viewerVisible = false;

  /**
   * Returns viewer to closed state
   */
  close(): void {
    this.viewerVisible = false;
  }

  open(data: ImageViewerData): void {
    this.viewerVisible = true;
    this.data = data;
  }

}
