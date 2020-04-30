import { Component, Output, EventEmitter } from '@angular/core';

/**
 * Content for the image viewer sidebar
 */
@Component({
  selector: 'ccf-image-viewer-content',
  templateUrl: './image-viewer-content.component.html',
  styleUrls: ['./image-viewer-content.component.scss']
})
export class ImageViewerContentComponent {

  /**
   * Emits closeViewer on close button click
   */
  @Output() closeViewer = new EventEmitter();

  /**
   * Hides the viewer
   */
  close() {
    this.closeViewer.emit();
  }
}
