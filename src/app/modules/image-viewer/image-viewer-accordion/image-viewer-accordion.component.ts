import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';

/**
 * Expandable accordion panel for the image viewer
 */
@Component({
  selector: 'ccf-image-viewer-accordion',
  templateUrl: './image-viewer-accordion.component.html',
  styleUrls: ['./image-viewer-accordion.component.scss']
})
export class ImageViewerAccordionComponent {

  /**
   * Metadata of image to be displayed in the About panel
   */
  @Input() metadata: { label: string; value: string; }[];

  /**
   * The list of layers used to render this and child components
   */
  @Input() layers: ImageViewerLayer[];

  /**
   * Output to pass up the changes made to the layers to parent components
   */
  @Output() layersChanged = new EventEmitter<ImageViewerLayer[]>();

  getInfoEntry(idx: number): string {
    return `${this.metadata[idx].label}: ${this.metadata[idx].value}`;
  }
}
