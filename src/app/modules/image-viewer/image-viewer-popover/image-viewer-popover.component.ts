import { Component } from '@angular/core';

@Component({
  selector: 'ccf-image-viewer-popover',
  templateUrl: './image-viewer-popover.component.html',
  styleUrls: ['./image-viewer-popover.component.scss']
})
export class ImageViewerPopoverComponent {

  viewerVisible = false;
  firstLoad = true;

  toggleViewerVisible(): void {
    this.viewerVisible = !this.viewerVisible;
    this.firstLoad = false;
  }

  closeViewer(): void {
    this.viewerVisible = false;
  }

}
