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
    this.layer.color = color;
    this.layer.colorScheme = scheme;
    this.layer.customizedColor = true;
    this.layerChange.emit(this.layer);
  }
}
