import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';


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
   * Determines whether the color icon is light enough to require a border
   * @param color The color hex code
   * @returns true if brightness is above a certain threshold
   */
  isLight(color: string): boolean {
    let r = 0;
    let g = 0;
    let b = 0;

    // 3 digits
    if (color.length === 4) {
      r = Number(`0x ${color[1]} + ${color[1]}`);
      g = Number(`0x ${color[2]} + ${color[2]}`);
      b = Number(`0x ${color[3]} + ${color[3]}`);

    // 6 digits
    } else if (color.length === 7) {
      r = Number(`0x ${color[1]} + ${color[2]}`);
      g = Number(`0x ${color[3]} + ${color[4]}`);
      b = Number(`0x ${color[5]} + ${color[6]}`);
    }

    const hsp = Math.sqrt(0.299*(r**2) + 0.587*(g**2) + 0.114*(b**2));

    return hsp > 225 ? true : false;
  }
}
