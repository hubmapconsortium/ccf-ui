import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ImageViewerLayer, isLight, isDark } from '../../../core/models/image-viewer-layer';


/**
 * Component dynamically displays a div with a shape and background that corresponds to the color scheme
 * or color of the layer that it gets passed.
 */
@Component({
  selector: 'ccf-color-picker-launcher',
  templateUrl: './color-picker-launcher.component.html',
  styleUrls: ['./color-picker-launcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerLauncherComponent {
  /**
   * An image-viewer layer which contains the styling information required to render this component.
   */
  @Input() layer: ImageViewerLayer;

  /**
   * Output that passes along changes made to the layer's properties from the color picker
   */
  @Output() layerChange = new EventEmitter<ImageViewerLayer>();

  /**
   * Class name for the color icon
   */
  get className(): string {
    return `color-icon ${this.layer.colorScheme.type === 'discrete' ? 'circle' : ''}`;
  }

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
