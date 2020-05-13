import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Options } from 'ng5-slider';

import { ColorScheme } from '../color-scheme-popup/color-scheme-popup.component';

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
  @Input() schemeOptions: ColorScheme[];

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
   * Options for the sliders
   */
  options: Options;

  /**
   * Initiates slider options and resets color status array
   */
  constructor() {
    this.options = {
      floor: 0,
      ceil: 100,
      step: 1,
      hideLimitLabels: true,
      hidePointerLabels: true
    };

    this.resetColorStatus();
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
   * Updates the color as well as the scheme when a color is selected
   * @param array contains two values corresponding to the scheme and color to be highlighted
   */
  colorChanged(array: number[]) {
    const newSchemeIndex = array[0];
    const newColorIndex = array[1];
    this.schemeChanged(newSchemeIndex);
    this.color = this.colorScheme.colors[newColorIndex];
    this.resetColorStatus();
    this.colorSelectedStatus[newSchemeIndex][newColorIndex] = true;
    this.colorChange.emit(this.color);
  }

  /**
   * Resets color status array
   */
  resetColorStatus() {
    this.colorSelectedStatus = [];
    for (let i = 0; i < 8; i++) {
      this.colorSelectedStatus.push(new Array(7).fill(false));
    }
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
