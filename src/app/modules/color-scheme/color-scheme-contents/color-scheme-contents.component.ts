import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Options } from 'ng5-slider';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';
import { ColorScheme, DEFAULT_COLOR_SCHEMES } from '../color-schemes';


/**
 * Contains the color menu and brightness/transparency sliders
 */
@Component({
  selector: 'ccf-color-scheme-contents',
  templateUrl: './color-scheme-contents.component.html',
  styleUrls: ['./color-scheme-contents.component.scss']
})
export class ColorSchemeContentsComponent {

  /**
   * Determines if the popup opens up or down from the icon position
   */
  @Input() bottom = false;

  /**
   * List of available schemes
   */
  @Input() schemeOptions: ColorScheme[] = DEFAULT_COLOR_SCHEMES;

  /**
   * Layer that the component is currently rendering, used to pull relevant properties from.
   */
  @Input() layer: ImageViewerLayer;

  /**
   * Used to emit any changes made to the layer or its properties
   */
  @Output() layerChange = new EventEmitter<ImageViewerLayer>();

  /**
   * Options for the brightness slider
   */
  brightnessSliderOptions: Options;

  /**
   * Options for the transparency slider
   */
  transparencySliderOptions: Options;

  /**
   * Updates current low brightness value with new low brightness value
   */
  get brightnessLow(): number { return this.layer.brightness[0]; }
  set brightnessLow(value: number) {
    this.updateLayer({ brightness: [value, this.brightnessHigh] });
  }

  /**
   * Updates current high brightness value with new high brightness value
   */
  get brightnessHigh(): number { return this.layer.brightness[1]; }
  set brightnessHigh(value: number) {
    this.updateLayer({ brightness: [this.brightnessLow, value] });
  }

  /**
   * Updates current transparency value with new transparency value
   */
  get transparency(): number { return this.layer.transparency; }
  set transparency(value: number) {
    this.updateLayer({ transparency: value });
  }

  /**
   * Initiates slider options
   */
  constructor() {
    const COMMON_OPTIONS = {
      floor: 0,
      ceil: 100,
      step: 1,
      hideLimitLabels: true,
      hidePointerLabels: true
    };

    this.brightnessSliderOptions = { ...COMMON_OPTIONS };
    this.transparencySliderOptions = { ...COMMON_OPTIONS, showSelectionBar: true };
  }

  /**
   * Emits new brightness selection
   */
  brightnessChanged(): void {
    this.layerChange.emit(this.layer);
  }

  /**
   * Emits new transparency value
   */
  transparencyChanged(): void {
    this.layerChange.emit(this.layer);
  }

  /**
   * Takes in the selected color and scheme and adds them to the Layer
   * before emitting the changed layer
   */
  colorChanged(color: string, scheme: ColorScheme): void {
    this.updateLayer({
      colorScheme: scheme,
      color,
      customizedColor: true
    });
  }

  /**
   * Updates layer with new layer settings
   * @param updates Contains updated layer settings
   */
  private updateLayer(
    updates: Partial<ConstructorParameters<typeof ImageViewerLayer>[0]>
  ): void {
    const { layer: current, layerChange } = this;
    const layer = new ImageViewerLayer({
      ...current,
      ...updates
    });

    this.layer = layer;
    layerChange.emit(layer);
  }
}
