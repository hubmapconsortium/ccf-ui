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

  label = '';
  organName = '';
  metadata: { label: string; value: string; }[];

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
    this.metadata = data.metadata;
    this.label = data.label;
    this.organName = data.organName;
    console.log(data);
  }

}
