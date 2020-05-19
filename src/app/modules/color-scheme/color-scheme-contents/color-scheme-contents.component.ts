import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Options } from 'ng5-slider';

import { ColorScheme, DEFAULT_COLOR_SCHEMES } from '../color-scheme-popup/color-scheme-popup.component';

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
  @Input() brightness: number[] = [0, 100];

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
  @Output() brightnessChange = new EventEmitter<number[]>();

  /**
   * Emitted when the transparency value changes
   */
  @Output() transparencyChange = new EventEmitter<number>();

  /**
   * Array to keep track of which scheme is currently selected (for highlighting purposes)
   */
  schemeSelectedStatus: boolean[] = Array(8).fill(false);

  /**
   * Nested array to keep track of which color is currently selected (for highlighting purposes)
   */
  colorSelectedStatus: boolean[][] = [];

  /**
   * Options for the brightness slider
   */
  options1: Options;

  /**
   * Options for the transparency slider
   */
  options2: Options;

  /**
   * Initiates slider options
   */
  constructor() {
    this.options1 = {
      floor: 0,
      ceil: 100,
      step: 1,
      hideLimitLabels: true,
      hidePointerLabels: true
    };

    this.options2 = {
      floor: 0,
      ceil: 100,
      step: 1,
      hideLimitLabels: true,
      hidePointerLabels: true,
      showSelectionBar: true,
    };
  }

  /**
   * Handles change in scheme selection
   * @param n position of the selected scheme
   */
  schemeChanged(n: number) {
    this.colorScheme = this.schemeOptions[n];
    this.schemeSelectedStatus = Array(8).fill(false);
    this.schemeSelectedStatus[n] = true;
    this.colorSchemeChange.emit(this.colorScheme);
  }

  /**
   * Emits the currently selected color and switches to the appropriate scheme
   * @param colorpos [scheme index, color index]
   */
  colorChanged(colorpos: number[]) {
    this.schemeChanged(colorpos[0]);
    this.color = this.colorScheme.colors[colorpos[1]];
    this.colorChange.emit(this.color);
  }

  /**
   * Returns whether or not a scheme is a selected gradient (for highlighting purposes)
   * @param i scheme index
   */
  gradientHighlight(i: number) {
    return this.schemeOptions[i].type === 'gradient' && this.schemeSelectedStatus[i] === true ? true : false;
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
