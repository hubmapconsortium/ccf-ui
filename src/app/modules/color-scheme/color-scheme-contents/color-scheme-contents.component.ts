import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Options } from 'ng5-slider';

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
   * Current scheme selected
   */
  @Input() colorScheme: ColorScheme;

  /**
   * Current color selected (undefined for gradients)
   */
  @Input() color: string | undefined;

  /**
   * Current brightness setting
   */
  @Input() brightness: [number, number] = [0, 100];

  /**
   * Current transparency setting
   */
  @Input() transparency: number;

  /**
   * Emitted when there is a color scheme change
   */
  @Output() colorSchemeChange = new EventEmitter<ColorScheme>();

  /**
   * Emitted when the selected color changes
   */
  @Output() colorChange = new EventEmitter<string | undefined>();

  /**
   * Emitted when the brightness selection changes
   */
  @Output() brightnessChange = new EventEmitter<[number, number]>();

  /**
   * Emitted when the transparency value changes
   */
  @Output() transparencyChange = new EventEmitter<number>();

  /**
   * Index of the currently selected scheme in schemeOptions
   */
  selectedSchemeIndex = 0;

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
   * Handles change in scheme selection
   * @param idx  index of the selected scheme
   */
  schemeChanged(idx: number) {
    this.colorScheme = this.schemeOptions[idx];
    this.selectedSchemeIndex = idx;
    this.colorSchemeChange.emit(this.colorScheme);
  }

  /**
   * Emits the selected color and switches the color property to the current color
   * @param color  the newly selected color
   */
  colorChanged(color: string | undefined) {
    this.color = color;
    this.colorChange.emit(color);
  }

  /**
   * Emits new brightness selection
   */
  brightnessChanged() {
    this.brightnessChange.emit(this.brightness);
  }

  /**
   * Emits new transparency value
   */
  transparencyChanged() {
    this.transparencyChange.emit(this.transparency);
  }
}
