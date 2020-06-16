import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';

/**
 * Legend in the image viewer displaying the selected layers and their colors
 */
@Component({
  selector: 'ccf-image-viewer-legend',
  templateUrl: './image-viewer-legend.component.html',
  styleUrls: ['./image-viewer-legend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageViewerLegendComponent {
  /**
   * The list of layers used to render this components
   */
  @Input() layers: ImageViewerLayer[];
}
