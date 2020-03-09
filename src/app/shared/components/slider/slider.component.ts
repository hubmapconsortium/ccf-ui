import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, ElementRef, HostListener, OnDestroy, ViewChild, Input } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'ccf-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnDestroy {
  @ViewChild(CdkPortal, { static: true }) popoverPortal: CdkPortal;
  @ViewChild('popover', { read: ElementRef, static: false }) popoverElement: ElementRef;
  @Input() label: string;
  @Input() values: number[];

  ageConstraints = {
    min: 1,
    max: 110
  };

  isSliderOpen = false;

  options: Options = {
    floor: this.ageConstraints.min,
    ceil: this.ageConstraints.max,
    step: 1,
    hideLimitLabels: true,
    hidePointerLabels: true
  };

  lowValue = this.options.floor;
  highValue = this.options.ceil;

  get RangeLabel(): string {
    const { lowValue, highValue, options: { ceil } } = this;
    if (lowValue === highValue) {
      return `${this.label}: ${lowValue}`;
    }
    return `${this.label}: ${lowValue}-${highValue}`;
  }

  private overlayRef: OverlayRef;

  private isSliderInitialized = false;

  constructor(
    overlay: Overlay,
    private element: ElementRef,
  ) {
    const position: ConnectedPosition = { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' };
    const positionStrategy = overlay.position().flexibleConnectedTo(element).withPositions([position]);
    this.overlayRef = overlay.create({
      panelClass: 'slider-pane',
      positionStrategy
    });
  }

  ngOnDestroy() {
    this.overlayRef.dispose();
  }

  @HostListener('document:click', ['$event.target'])
  @HostListener('document:touchstart', ['$event.target'])

  closeSliderPopover(target: HTMLElement): void {
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
    const { isSliderOpen, isSliderInitialized } = this;
    if (!isSliderInitialized && !isSliderOpen) { this.initializeSliderPopover(); }
    this.isSliderOpen = !isSliderOpen;
  }

  sliderValueChanged(): void {
    const { lowValue, highValue, options: { floor, ceil } } = this;
    const min = lowValue !== floor ? lowValue : undefined;
    const max = highValue !== ceil ? highValue : undefined;
  }

  private initializeSliderPopover(): void {
    const { overlayRef, popoverPortal } = this;

    overlayRef.attach(popoverPortal);
    overlayRef.updatePosition();

    this.isSliderInitialized = true;
  }
}
