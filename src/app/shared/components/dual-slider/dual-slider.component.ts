import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, ViewChild, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Options } from 'ng5-slider';


@Component({
  selector: 'ccf-dual-slider',
  templateUrl: './dual-slider.component.html',
  styleUrls: ['./dual-slider.component.scss']
})
export class DualSliderComponent implements OnDestroy, OnChanges {
  @ViewChild(CdkPortal, { static: true }) popoverPortal: CdkPortal;
  @ViewChild('popover', { read: ElementRef, static: false }) popoverElement: ElementRef;
  @Input() label: string;
  @Input() valueRange: number[];
  @Input() selection: number[];
  @Output() selectionChange = new EventEmitter<number[]>();

  isSliderOpen = false;
  options: Options;
  lowValue: number;
  highValue: number;

  get RangeLabel(): string {
    const { lowValue, highValue } = this;
    if (lowValue === highValue) {
      return `${lowValue}`;
    }
    return `${lowValue}-${highValue}`;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.valueRange) {
      this.optionsChanged();
    }
    if (changes.selection) {
      // detect when selection is changed and update low/high value
      this.lowValue = Math.min(...this.selection);
      this.highValue = Math.max(...this.selection);
    }
  }

  optionsChanged() {
    this.options = {
      floor: this.valueRange ? this.valueRange[0] : 0,
      ceil: this.valueRange ? this.valueRange[1] : 0,
      step: 1,
      hideLimitLabels: true,
      hidePointerLabels: true
    };
    this.lowValue = this.options?.floor ?? 0;
    this.highValue = this.options?.ceil ?? 0;
  }

  ngOnDestroy() {
    this.overlayRef.dispose();
  }

  @HostListener('document:click', ['$event.target'])
  @HostListener('document:mousemove', ['$event.target'])
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

    this.overlayRef.detach();
    this.isSliderInitialized = false;

    this.isSliderOpen = false;
  }

  toggleSliderPopover(): void {
    const { isSliderOpen, isSliderInitialized } = this;
    if (isSliderInitialized) {
      this.overlayRef.detach();
      this.isSliderInitialized = false;
    } else if (!isSliderInitialized && !isSliderOpen) {
      this.initializeSliderPopover();
    }
    this.isSliderOpen = !isSliderOpen;
  }

  sliderValueChanged(): void {
    const { lowValue, highValue, options: { floor, ceil } } = this;
    const min = lowValue !== floor ? lowValue : undefined;
    const max = highValue !== ceil ? highValue : undefined;

    this.selection = [lowValue, highValue];
    this.selectionChange.emit(this.selection);
  }

  private initializeSliderPopover(): void {
    const { overlayRef, popoverPortal } = this;

    overlayRef.attach(popoverPortal);
    overlayRef.updatePosition();

    this.isSliderInitialized = true;
  }
}
