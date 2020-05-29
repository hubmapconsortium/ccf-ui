import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';

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

  /**
   * Dynamically creates a background style for the component based on the Input layer's color or
   * color scheme
   */
  getBackground(layer: ImageViewerLayer): string {
    console.log(1);
    if (layer.colorScheme.type === 'discrete') { return layer.color; }

    const colors = layer.colorScheme.colors;
    const positions = layer.colorScheme.positions;

    let gradient = 'linear-gradient(to right, ';
    colors.forEach((color, index) => {
      gradient += color + ' ' + positions[index] * 100 + '%';
      if (index < colors.length - 1) { gradient += ', '; }
    });
    gradient += ')';
    return gradient;
  }
}
