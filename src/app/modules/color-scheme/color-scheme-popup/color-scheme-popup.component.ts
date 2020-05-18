import { Component, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * Color scheme to be used in visualizing layers of the image
 */
export class ColorScheme {

  /**
   * Whether the scheme is discrete or gradient
   */
  type: 'discrete' | 'gradient';

  /**
   * Name of scheme
   */
  name: string;

  /**
   * Colors used in the scheme (undefined for gradients)
   */
  colors: string[] | undefined[];

  /**
   * Positions for mapping the data to colors
   */
  positions: number[];
}

/**
 * Default Scheme1 (discrete)
 */
const scheme1: ColorScheme = {
  type: 'discrete',
  name: 'bluered',
  colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme2 (discrete)
 */
const scheme2: ColorScheme = {
  type: 'discrete',
  name: 'greenred',
  colors: ['#1A9850', '#91CF60', '#D9EF8B', '#FFFFBF', '#FEE08B', '#FC8D59', '#D73027'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme3 (discrete)
 */
const scheme3: ColorScheme = {
  type: 'discrete',
  name: 'purplebrown',
  colors: ['#542788', '#998EC3', '#D8DAEB', '#F7F7F7', '#FEE0B6', '#F1A340', '#B35806'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme4 (discrete)
 */
const scheme4: ColorScheme = {
  type: 'discrete',
  name: 'redtan',
  colors: ['#990000', '#D7301F', '#EF6548', '#FC8D59', '#FDBB84', '#FDD49E', '#FEF0D9'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme5 (discrete)
 */
const scheme5: ColorScheme = {
  type: 'discrete',
  name: 'purplelightblue',
  colors: ['#6E016B', '#88419D', '#8C6BB1', '#8C96C6', '#9EBCDA', '#BFD3E6', '#EDF8FB'],
  positions: [0, .166, .333, .5, .666, .833, 1]
};

/**
 * Default Scheme6 (gradient)
 */
const scheme6: ColorScheme = {
  type: 'gradient',
  name: 'viridis',
  colors: ['#FFE31C', '#21908A', '#450B57'],
  positions: [0, .5, 1]
};

/**
 * Default Scheme7 (gradient)
 */
const scheme7: ColorScheme = {
  type: 'gradient',
  name: 'magma',
  colors: ['#F8FC9D', '#B4335A', '#020202'],
  positions: [0, .5, 1]
};

/**
 * Default Scheme8 (gradient)
 */
const scheme8: ColorScheme = {
  type: 'gradient',
  name: 'plasma',
  colors: ['#F2F424', '#C6427E', '#0C1687'],
  positions: [0, .5, 1]
};

/**
 * Default scheme options
 */
export const DEFAULT_COLOR_SCHEMES =
  [scheme1, scheme2, scheme3, scheme4, scheme5, scheme6, scheme7, scheme8];

/**
 * Component for the scheme selector popup
 */
@Component({
  selector: 'ccf-color-scheme-popup',
  templateUrl: './color-scheme-popup.component.html',
  styleUrls: ['./color-scheme-popup.component.scss']
})
export class ColorSchemePopupComponent {

  /**
   * Controls visibility of the popup
   */
  popupVisible = false;

  /**
   * Current color scheme selected (default is scheme1)
   */
  colorScheme: ColorScheme = scheme1;

  /**
   * Schemes available to choose from
   */
  schemeOptions: ColorScheme[] = DEFAULT_COLOR_SCHEMES;

  /**
   * Current color selected (undefined for gradients)
   */
  color: string | undefined;

  /**
   * Brightness of selected scheme
   */
  brightness: number[] = [0, 100];

  /**
   * Transparency of selected scheme
   */
  transparency = 0;

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
   * Listens to document click event
   * Closes the popup only if user clicks outside the popup
   * @param target The element on which the event was fired
   */
  @HostListener('document:click', ['$event.target']) // tslint:disable-line:no-unsafe-any
  close(target: HTMLElement): void {
    const popupElement = document.getElementById('scheme-contents');
    const buttonElement = document.getElementById('open-popup');
    if (!this.popupVisible) {
      return;
    } else if (buttonElement && buttonElement.contains(target)) {
      return;
    } else if (popupElement && popupElement.contains(target)) {
      return;
    }
    this.popupVisible = false;
  }

  /**
   * Opens popup
   */
  open(): void {
    this.popupVisible = true;
  }

  /**
   * Updates current color scheme and emits the new color scheme
   * @param scheme = the new selected scheme
   */
  updateScheme(scheme: ColorScheme) {
    this.colorScheme = scheme;
    this.colorSchemeChange.emit(scheme);
  }

  /**
   * Updates current selected color and emits the new color
   * @param color = the new selected color
   */
  updateColor(color: string | undefined) {
    this.color = color;
    this.colorChange.emit(color);
  }

  /**
   * Updates brightness selection and emits the new brightness selection
   * @param brightness = the new brightness selection
   */
  updateBrightness(brightness: number[]) {
    this.brightness = brightness;
    this.brightnessChange.emit(brightness);
  }

  /**
   * Updates transparency and emits the new transparency value
   * @param transparency = the new transparency value
   */
  updateTransparency(transparency: number) {
    this.transparency = transparency;
    this.transparencyChange.emit(transparency);
  }
}
