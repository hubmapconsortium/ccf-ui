import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';
import { ColorScheme, DEFAULT_COLOR_SCHEMES } from '../color-schemes';


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

  /** Owner button element which when clicked will not close on. */
  private owner?: Element;

  /**
   * Listens to document click event
   * Closes the popup only if user clicks outside the popup
   * @param target The element on which the event was fired
   */
  @HostListener('document:click', ['$event.target']) // tslint:disable-line:no-unsafe-any
  close(target: HTMLElement): void {
    const popupElement = document.getElementsByClassName('scheme-popup show')[0];
    if (!this.popupVisible || popupElement?.contains(target) || this.owner?.contains(target)) {
      return;
    }
    this.popupVisible = !this.popupVisible;
  }

  /**
   * Opens popup
   */
  open(owner?: Element): void {
    this.owner = owner;
    this.popupVisible = !this.popupVisible;
  }
}
