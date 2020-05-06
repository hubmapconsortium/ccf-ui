import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ImageViewerData } from 'ccf-database';


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
   * Image data to be displayed in the sidebar
   */
  @Input() data: ImageViewerData;

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
