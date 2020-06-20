import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';
import { ColorScheme } from '../../color-scheme/color-schemes';


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
  @Output() layerChange = new EventEmitter<ImageViewerLayer>();

  /** Emits when the default scheme has changed.  */
  @Output() schemeChange = new EventEmitter<ColorScheme>();
}
