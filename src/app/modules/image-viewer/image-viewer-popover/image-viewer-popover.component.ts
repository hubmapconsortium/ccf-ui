import { Component } from '@angular/core';

/**
 * Popup that displays detailed information on a selected image along with viewing options
 */
@Component({
  selector: 'ccf-image-viewer-popover',
  templateUrl: './image-viewer-popover.component.html',
  styleUrls: ['./image-viewer-popover.component.scss']
})
export class ImageViewerPopoverComponent {

  /**
   * Whether or not the image viewer is visible
   */
  viewerVisible = false;

  /**
   * Controls visibility of the viewer
   */
  toggleViewerVisible(): void {
    this.viewerVisible = !this.viewerVisible;
  }

  /**
   * Returns viewer to closed state
   */
  closeViewer(): void {
    this.viewerVisible = false;
  }

}
