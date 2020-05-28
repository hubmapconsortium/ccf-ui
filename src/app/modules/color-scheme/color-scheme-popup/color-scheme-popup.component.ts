import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { ColorScheme, ColorSchemeSelection, DEFAULT_COLOR_SCHEMES } from '../color-schemes';

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
  @Input() colorScheme: ColorScheme = DEFAULT_COLOR_SCHEMES[0];

  /**
   * Schemes available to choose from
   */
  @Input() schemeOptions: ColorScheme[] = DEFAULT_COLOR_SCHEMES;

  /**
   * Current color index
   */
  @Input() coloridx = 0;

  /**
   * Brightness of selected scheme
   */
  @Input() brightness: [number, number] = [0, 100];

  /**
   * Transparency of selected scheme
   */
  @Input() transparency = 0;

  /**
   * Emitter containing information on selected scheme and color
   */
  @Output() schemeChange = new EventEmitter<ColorSchemeSelection>();

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
    const launchButtons = Array.from(document.getElementsByClassName('launch-button'));
    if (!this.popupVisible ||
      (popupElement && popupElement.contains(target))) {
      return;
    }
    for (const button of launchButtons) {
      if (button.contains(target)) {
        return;
      }
    }
    this.popupVisible = false;
  }

  /**
   * Opens popup
   */
  open(): void {
    this.popupVisible = !this.popupVisible;
  }

  /**
   * Updates current color scheme and emits schemeChange
   * @param scheme = the new selected scheme
   */
  updateScheme(scheme) {
    // tslint:disable-next-line: no-unsafe-any
    this.colorScheme = scheme.colorScheme;
    // tslint:disable-next-line: no-unsafe-any
    this.coloridx = scheme.coloridx;
    this.schemeChange.emit({ scheme: this.colorScheme, coloridx: this.coloridx });
  }

  /**
   * Updates current selected color index and emits schemeChange
   * @param coloridx = the new selected color index
   */
  updateColor(coloridx: number) {
    this.coloridx = coloridx;
    this.schemeChange.emit({ scheme: this.colorScheme, coloridx: this.coloridx });
  }

  /**
   * Updates brightness selection and emits the new brightness selection
   * @param brightness = the new brightness selection
   */
  updateBrightness(brightness: [number, number]) {
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
