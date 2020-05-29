import { Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { ImageViewerLayer } from 'src/app/core/models/image-viewer-layer';
import { ColorScheme } from 'src/app/core/models/color-scheme';

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
  @Input() layer:ImageViewerLayer;

  /**
   * Output that passes along changes made to the layer's properties from the color picker
   */
  @Output() layerChange = new EventEmitter<ImageViewerLayer>();

  /**
   * Dynamically creates a background style for the component based on the Input layer's color or
   * color scheme
   */
  get background(): string {
    if (this.layer.colorScheme.type === 'discrete') { return this.layer.color; }

    const colors = this.layer.colorScheme.colors;
    const positions = this.layer.colorScheme.positions;

    let gradient = 'linear-gradient(to right, ';
    colors.forEach((color, index) => {
      gradient += color + ' ' + positions[index] * 100 + '%';
      if(index < colors.length - 1){ gradient += ', '; }
    });
    gradient += ')';
    return gradient;
  }
}
