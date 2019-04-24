import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Options } from 'ng5-slider';

import { SearchService } from '../../shared/services/search/search.service';

@Component({
  selector: 'ccf-age-selector',
  templateUrl: './age-selector.component.html',
  styleUrls: ['./age-selector.component.scss']
})
export class AgeSelectorComponent implements OnDestroy {
  @ViewChild(CdkPortal) popoverPortal: CdkPortal;
  @ViewChild('popover', { read: ElementRef }) popoverElement: ElementRef;

  isSliderOpen = false;

  options: Options = {
    floor: 0,
    ceil: 125,
    step: 1,
    hideLimitLabels: true,
    hidePointerLabels: true
  };
  lowValue: number = this.options.floor;
  highValue: number = this.options.ceil;
  get ageRangeLabel(): string {
    const { lowValue, highValue } = this;
    return lowValue === highValue ? String(lowValue) : `${lowValue} - ${highValue}`;
  }

  private overlayRef: OverlayRef;
  private sliderInitialized = false;

  constructor(
    overlay: Overlay,
    private element: ElementRef,
    private search: SearchService
  ) {
    const position: ConnectedPosition = { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' };
    const positionStrategy = overlay.position().flexibleConnectedTo(element).withPositions([position]);
    this.overlayRef = overlay.create({ positionStrategy });
  }

  ngOnDestroy() {
    this.overlayRef.dispose()
  }

  @HostListener('document:click', ['$event.target'])
  @HostListener('document:touchstart', ['$event.target'])
  closeSlidePopover(target: HTMLElement): void {
    const { element, isSliderOpen, popoverElement } = this;
    if (!isSliderOpen) {
      return;
    } else if (element.nativeElement.contains(target)) {
      return;
    } else if (popoverElement && popoverElement.nativeElement.contains(target)) {
      return;
    }

    this.isSliderOpen = false;
  }

  toggleSliderPopover(): void {
    const { isSliderOpen, sliderInitialized } = this;
    this.isSliderOpen = !isSliderOpen;
    if (!sliderInitialized && !isSliderOpen) { this.initializeSliderPopover(); }
  }

  sliderValueChanged(): void {
    const { lowValue, highValue, options: { floor, ceil }, search } = this;
    const min = lowValue !== floor ? lowValue : undefined;
    const max = highValue !== ceil ? highValue : undefined;
    search.setAgeRange(min, max);
  }

  private initializeSliderPopover(): void {
    const { overlayRef, popoverPortal } = this;

    overlayRef.attach(popoverPortal);
    overlayRef.updatePosition();

    this.sliderInitialized = true;
  }
}
