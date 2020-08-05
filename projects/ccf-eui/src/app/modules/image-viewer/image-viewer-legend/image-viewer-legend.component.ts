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
  // tslint:disable-next-line: no-unsafe-any
  @Input() set layers(layers: ImageViewerLayer[]) {
    this._layers = [...layers].sort((v1, v2) => v1.selectionOrder - v2.selectionOrder);
  }
  get layers(): ImageViewerLayer[] { return this._layers; }
  private _layers: ImageViewerLayer[];
}
