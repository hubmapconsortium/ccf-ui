import { ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, ElementRef, OnDestroy, ViewChild, HostListener } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'ccf-age-selector',
  templateUrl: './age-selector.component.html',
  styleUrls: ['./age-selector.component.scss']
})
export class AgeSelectorComponent implements OnDestroy {
  @ViewChild(CdkPortal) popoverPortal: CdkPortal;
  @ViewChild('slider', { read: ElementRef }) sliderElement: ElementRef;

  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1
  };
  lowValue: number = 20;
  highValue: number = 80;

  isSliderOpen = false;

  private overlayRef: OverlayRef;
  private sliderInitialized = false;

  constructor(private element: ElementRef, overlay: Overlay) {
    const position: ConnectedPosition = { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' };
    const positionStrategy = overlay.position().flexibleConnectedTo(element).withPositions([position]);
    this.overlayRef = overlay.create({ positionStrategy });

    console.log(this);
    // TODO: get age range from service
  }

  ngOnDestroy() {
    this.overlayRef.dispose()
  }

  @HostListener('document:click', ['$event.target'])
  @HostListener('document:touchstart', ['$event.target'])
  closeSlidePopover(target: HTMLElement): void {
    const { element, isSliderOpen, sliderElement } = this;
    if (!isSliderOpen) {
      return;
    } else if (element.nativeElement.contains(target)) {
      return;
    } else if (sliderElement && sliderElement.nativeElement.contains(target)) {
      return;
    }

    this.isSliderOpen = false;
  }

  toggleSliderPopover(): void {
    const { isSliderOpen, sliderInitialized } = this;
    this.isSliderOpen = !isSliderOpen;
    if (!sliderInitialized && !isSliderOpen) { this.initializeSliderPopover(); }
  }

  sliderValuesChanged(): void {
    console.log('foo')
    // TODO: Update search state
  }

  private initializeSliderPopover(): void {
    const { overlayRef, popoverPortal } = this;
    const config = overlayRef.getConfig();
    const positionStrategy = config.positionStrategy as FlexibleConnectedPositionStrategy;

    overlayRef.attach(popoverPortal);
    overlayRef.updatePosition();
    positionStrategy.withLockedPosition();

    this.sliderInitialized = true;
  }
}
