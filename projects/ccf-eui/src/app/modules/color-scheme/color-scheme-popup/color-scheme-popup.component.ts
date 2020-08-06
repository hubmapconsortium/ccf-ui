import { Component, EventEmitter, HostListener, Input, Output, ViewChild, ElementRef } from '@angular/core';

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

  @ViewChild('content', { static: true, read: ElementRef }) contentElement: ElementRef<HTMLElement>;

  /**
   * Controls visibility of the popup
   */
  popupVisible = false;

  /** Owner button element which when clicked will not close on. */
  private owner?: Element;

  /**
   * Controls direction the popup opens
   */
  bottom = false;

  /**
   * Listens to document click event
   * Closes the popup only if user clicks outside the popup
   * @param target The element on which the event was fired
   */
  @HostListener('document:click', ['$event.target']) // tslint:disable-line:no-unsafe-any
  close(target: HTMLElement): void {
    const { popupVisible, contentElement: { nativeElement: content } = { nativeElement: undefined }, owner } = this;
    if (!popupVisible || content?.contains(target) || owner?.contains(target)) {
      return;
    }
    this.popupVisible = !popupVisible;
  }

  /**
   * Opens popup and calculates which direction the popup opens based on click position
   */
  open(event: MouseEvent, owner?: Element): void {
    const clickPos = event.pageY;
    this.bottom = window.innerHeight - clickPos < 336;
    this.owner = owner;
    this.popupVisible = true;
  }
}
