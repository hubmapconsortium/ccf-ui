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

  isLight(color: string): boolean {
    let r = 0;
    let g = 0;
    let b = 0;

    // 3 digits
    if (color.length === 4) {
      r = Number('0x' + color[1] + color[1]);
      g = Number('0x' + color[2] + color[2]);
      b = Number('0x' + color[3] + color[3]);

    // 6 digits
    } else if (color.length === 7) {
      r = Number('0x' + color[1] + color[2]);
      g = Number('0x' + color[3] + color[4]);
      b = Number('0x' + color[5] + color[6]);
    }

    const hsp = Math.sqrt(0.299*(r**2) + 0.587*(g**2) + 0.114*(b**2));

    return hsp > 225 ? true : false;
  }
}
