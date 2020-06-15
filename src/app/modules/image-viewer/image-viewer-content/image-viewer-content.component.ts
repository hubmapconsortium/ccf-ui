import { Component, Input, Output, EventEmitter } from '@angular/core';

import { ImageViewerData } from 'ccf-database';
import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';


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
   * The list of layers used to render this and child components
   */
  @Input() layers: ImageViewerLayer[];

  /**
   * Emits closeViewer on close button click
   */
  @Output() closeViewer = new EventEmitter();

  /**
   * Output to pass up the changes made to the layers to parent components
   */
  @Output() layersChanged = new EventEmitter<ImageViewerLayer>();

  /**
   * Hides the viewer
   */
  close(): void {
    this.closeViewer.emit();
  }
}
