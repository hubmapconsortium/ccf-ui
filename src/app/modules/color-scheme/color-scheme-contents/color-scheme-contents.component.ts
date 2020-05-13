import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ColorScheme } from '../color-scheme-popup/color-scheme-popup.component';
import { Options } from 'ng5-slider';

@Component({
  selector: 'ccf-color-scheme-contents',
  templateUrl: './color-scheme-contents.component.html',
  styleUrls: ['./color-scheme-contents.component.scss']
})
export class ColorSchemeContentsComponent {

  options: Options;

  @Input() schemeOptions: ColorScheme[];
  @Input() colorScheme: ColorScheme;
  @Input() color: string | undefined;
  @Input() brightness: number[] = [0, 100];
  @Input() transparency: number;

  @Output() colorSchemeChange = new EventEmitter<ColorScheme>();
  @Output() colorChange = new EventEmitter<string | undefined>();
  @Output() brightnessChange = new EventEmitter<number[]>();
  @Output() transparencyChange = new EventEmitter<number>();

  brightnesslowValue: number;
  brightnesshighValue: number;
  transparencyValue: number;
  schemeSelectedStatus: boolean[] = Array(8).fill(false);
  colorSelectedStatus: boolean[][] = [
  ];

  constructor() {
    this.options = {
      floor: 0,
      ceil: 100,
      step: 1,
      hideLimitLabels: true,
      hidePointerLabels: true
    };
    this.brightnesslowValue = this.options.floor ?? 0;
    this.brightnesshighValue = this.options.ceil ?? 0;
    this.transparencyValue = this.options.floor ?? 0;

    for (let i=0; i<7; i++) {
      this.colorSelectedStatus.push(new Array(7).fill(false));
    }
  }

  schemeChanged(n: number) {
    this.colorScheme = this.schemeOptions[n];
    this.schemeSelectedStatus = Array(8).fill(false);
    this.schemeSelectedStatus[n] = true;
    this.colorSchemeChange.emit(this.colorScheme);
  }

  colorChanged(array: number[]) {
    const newSchemeIndex = array[0];
    const newColorIndex = array[1];
    this.schemeChanged(newSchemeIndex);
    this.color = this.colorScheme.colors[newColorIndex];
    this.resetColorStatus();
    this.colorSelectedStatus[newSchemeIndex][newColorIndex] = true;
    this.colorChange.emit(this.color);
  }

  resetColorStatus() {
    this.colorSelectedStatus = [];
    for (let i=0; i<8; i++) {
      this.colorSelectedStatus.push(new Array(7).fill(false));
    }
  }

  brightnessChanged() {
    [this.brightnesslowValue, this.brightnesshighValue] = this.brightness;
    this.brightnessChange.emit(this.brightness);
  }

  transparencyChanged() {
    this.transparencyValue = this.transparency;
    this.transparencyChange.emit(this.transparency);
  }
}
