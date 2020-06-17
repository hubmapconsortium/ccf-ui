import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ImageViewerLayer, isLight, isDark } from '../../../core/models/image-viewer-layer';

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

  /**
   * Determines whether the color icon is light enough to require a border (light mode only)
   * @param color The color hex code
   * @returns true if brightness is above a certain threshold
   */
  iconLight(color: string): boolean {
    return isLight(color);
  }

  /**
   * Determines whether the color icon is dark enough to require a border (dark mode only)
   * @param color The color hex code
   * @returns true if brightness is below a certain threshold
   */
  iconDark(color: string): boolean {
    return isDark(color);
  }
}
