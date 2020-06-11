import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
}
