import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { ColorScheme, ColorSchemeSelection, DEFAULT_COLOR_SCHEMES } from '../color-schemes';
import { ImageViewerLayer } from 'src/app/core/models/image-viewer-layer';

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
   * Schemes available to choose from
   */
  @Input() schemeOptions: ColorScheme[] = DEFAULT_COLOR_SCHEMES;

  /**
   * The Layer which we use to pull the properties we need from
   */
  @Input() layer: ImageViewerLayer;

  /**
   * Output we use to emit any changes to the layer or its properties
   */
  @Output() layerChange = new EventEmitter<ImageViewerLayer>();

  /**
   * Controls visibility of the popup
   */
  popupVisible = false;

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
}
