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

  lowValue: number;
  highValue: number;

  constructor() {
    this.options = {
      floor: 0,
      ceil: 100,
      step: 1,
      hideLimitLabels: true,
      hidePointerLabels: true
    };
    this.lowValue = this.options.floor ?? 0;
    this.highValue = this.options.ceil ?? 0;
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.brightness) {
      this.lowValue = Math.min(...this.brightness);
      this.highValue = Math.max(...this.brightness);
    }
  }

  schemeChanged(n: number) {
    this.colorScheme = this.schemeOptions[n];
    this.colorSchemeChange.emit(this.colorScheme);
  }

  brightnessChanged() {
    this.lowValue = this.brightness[0];
    this.highValue = this.brightness[1];
    console.log(this.brightness);
    this.brightnessChange.emit(this.brightness);
  }
}
