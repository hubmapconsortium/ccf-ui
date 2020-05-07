import { Component } from '@angular/core';

export class ColorScheme {
  type: 'palette' | 'gradient';
  name: string; // viridis
  colors: string[]; // array of RGB colors
  positions: number[];
}

@Component({
  selector: 'ccf-color-scheme-popup',
  templateUrl: './color-scheme-popup.component.html',
  styleUrls: ['./color-scheme-popup.component.scss']
})
export class ColorSchemePopupComponent {

  palette1: ColorScheme = {
    type: 'palette',
    name: 'bluered',
    colors: ['#01579b', '#212121', '#323232', '#F5F5F5', '#FFCCBC', '#FF7043', '#B71C1C'],
    positions: [0, .166, .333, .5, .666, .833, 1]
  };

  palette2: ColorScheme = {
    type: 'palette',
    name: 'greenred',
    colors: ['#388e3c', '#9CCC65', '#E6EE9C', '#FFFDE7', '#FFE082', '#FF8A65', '#D32F2F'],
    positions: [0, .166, .333, .5, .666, .833, 1]
  };

  colorScheme: ColorScheme = this.palette1;
  schemeOptions: ColorScheme[] = [this.palette1, this.palette2];
  color: string | undefined = this.palette1.colors[0];
  brightness: number[] = [0, 100];
  transparency = 0;

  updateScheme(scheme: ColorScheme) {
    this.colorScheme = scheme;
    console.log(this.colorScheme);
  }

  updateBrightness(brightness: number[]) {
    this.brightness = brightness;
    console.log(this.brightness);
  }

  updateTransparency(transparency: number) {
    this.transparency = transparency;
    console.log(this.transparency);
  }
}
