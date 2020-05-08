import { Component } from '@angular/core';

export class ColorScheme {
  type: 'discrete' | 'gradient';
  name: string; // viridis
  colors: string[]; // array of RGB colors
  positions: number[];
}

const scheme1: ColorScheme = {
  type: 'discrete',
  name: 'bluered',
  colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

const scheme2: ColorScheme = {
  type: 'discrete',
  name: 'greenred',
  colors: ['#1A9850', '#91CF60', '#D9EF8B', '#FFFFBF', '#FEE08B', '#FC8D59', '#D73027'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

const scheme3: ColorScheme = {
  type: 'discrete',
  name: 'purplebrown',
  colors: ['#542788', '#998EC3', '#D8DAEB', '#F7F7F7', '#FEE0B6', '#F1A340', '#B35806'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

const scheme4: ColorScheme = {
  type: 'discrete',
  name: 'redtan',
  colors: ['#990000', '#D7301F', '#EF6548', '#FC8D59', '#FDBB84', '#FDD49E', '#FEF0D9'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

const scheme5: ColorScheme = {
  type: 'discrete',
  name: 'purplelightblue',
  colors: ['#6E016B', '#88419D', '#8C6BB1', '#8C96C6', '#9EBCDA', '#BFD3E6', '#EDF8FB'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

const scheme6: ColorScheme = {
  type: 'gradient',
  name: 'viridis',
  colors: [],
  positions: [0, .5, 1]
};

const scheme7: ColorScheme = {
  type: 'gradient',
  name: 'magma',
  colors: [],
  positions: [0, .5, 1]
};

const scheme8: ColorScheme = {
  type: 'gradient',
  name: 'plasma',
  colors: [],
  positions: [0, .5, 1]
};

const DEFAULT_COLOR_SCHEMES =
[scheme1, scheme2, scheme3, scheme4, scheme5, scheme6, scheme7, scheme8];

@Component({
  selector: 'ccf-color-scheme-popup',
  templateUrl: './color-scheme-popup.component.html',
  styleUrls: ['./color-scheme-popup.component.scss']
})
export class ColorSchemePopupComponent {

  popupVisible = false;

  colorScheme: ColorScheme = scheme1;
  schemeOptions: ColorScheme[] = DEFAULT_COLOR_SCHEMES;
  color: string | undefined;
  brightness: number[] = [0, 100];
  transparency = 0;

  open() {
    this.popupVisible = !this.popupVisible;
  }

  updateScheme(scheme: ColorScheme) {
    this.colorScheme = scheme;
    console.log('colorScheme', this.colorScheme);
  }

  updateBrightness(brightness: number[]) {
    this.brightness = brightness;
    console.log('brightness', this.brightness);
  }

  updateTransparency(transparency: number) {
    this.transparency = transparency;
    console.log('transparency', this.transparency);
  }
}
