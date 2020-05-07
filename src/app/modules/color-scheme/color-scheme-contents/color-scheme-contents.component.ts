import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ColorScheme } from '../color-scheme-popup/color-scheme-popup.component';
import { Options } from 'ng5-slider';

@Component({
  selector: 'ccf-color-scheme-contents',
  templateUrl: './color-scheme-contents.component.html',
  styleUrls: ['./color-scheme-contents.component.scss']
})
export class ColorSchemeContentsComponent implements OnChanges {

  options: Options;

  @Input() schemeOptions: ColorScheme[];
  @Input() colorScheme: ColorScheme;
  @Input() color: string | undefined;
  @Input() brightness: number[];
  @Input() transparency: number;

  @Output() colorSchemeChange = new EventEmitter<ColorScheme>();
  @Output() colorChange = new EventEmitter<string | undefined>();
  @Output() brightnessChange = new EventEmitter<number[]>();
  @Output() transparencyChange = new EventEmitter<number>();

  brightnesslowValue: number;
  brightnesshighValue: number;
  transparencyValue: number;

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
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.brightness) {
      this.brightnesslowValue = Math.min(...this.brightness);
      this.brightnesshighValue = Math.max(...this.brightness);
    }
    if (changes.transparency) {
      this.transparencyValue = this.transparency;
    }
  }

  schemeChanged(n: number) {
    this.colorScheme = this.schemeOptions[n];
    this.colorSchemeChange.emit(this.colorScheme);
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
