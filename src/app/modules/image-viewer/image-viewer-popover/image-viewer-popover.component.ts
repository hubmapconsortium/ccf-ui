import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ccf-image-viewer',
  templateUrl: './image-viewer-popover.component.html',
  styleUrls: ['./image-viewer-popover.component.scss']
})
export class ImageViewerPopoverComponent {

  contentsVisible = false;

  toggleContentVisible(): void {
    this.contentsVisible = !this.contentsVisible;
  }

  removeBox() {
    this.contentsVisible = false;
  }

}
