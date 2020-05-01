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

  @Input() metadata: { label: string; value: string; }[];
  @Input() label: string;
  @Input() organName: string;

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
