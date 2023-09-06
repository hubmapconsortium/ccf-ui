/* eslint-disable @typescript-eslint/member-ordering */
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild,
} from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { GoogleAnalyticsService } from 'ngx-google-analytics';


/**
 * Component containing a button that when clicked will show a slider popover.
 */
@Component({
  selector: 'ccf-dual-slider',
  templateUrl: './dual-slider.component.html',
  styleUrls: ['./dual-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DualSliderComponent implements OnDestroy, OnChanges {
  /**
   * Reference to the template for the slider popover.
   */
  @ViewChild(CdkPortal, { static: true }) popoverPortal: CdkPortal;

  /**
   * Reference to the popover element.
   * This is undefined until the slider popover is initialized.
   */
  @ViewChild('popover', { read: ElementRef, static: false }) popoverElement: ElementRef<HTMLElement>;

  /**
   * Which criteria the slider is selecting for.
   */
  @Input() label: string;

  /**
   * The lower and upper range of the slider.
   */
  @Input() valueRange: number[];

  /**
   * The current range selected.
   */
  @Input() selection: number[];

  /**
   * Emits the new selection range when a change is made to it.
   */
  @Output() readonly selectionChange = new EventEmitter<number[]>();

  /**
   * Determines whether slider popover is shown.
   */
  isSliderOpen = false;

  /**
   * Slider options.
   */
  options: Options;

  /**
   * Value bound to the slider's low pointer value.
   */
  lowValue: number;

  /**
   * Value bound to the slider's high pointer value.
   */
  highValue: number;

  /**
   * Determines if slider contents are visible (used for fade-in effect).
   */
  contentsVisible = 'invisible';

  /**
   * Computes the current age range for display in the button.
   */
  get rangeLabel(): string {
    const { lowValue, highValue } = this;
    if (lowValue === highValue) {
      return `${lowValue}`;
    }
    return `${lowValue}-${highValue}`;
  }

  /**
   * Reference to the slider popover overlay.
   */
  private overlayRef: OverlayRef;

  /**
   * Determines whether slider popover has been created and initialized.
   */
  private isSliderInitialized = false;

  /**
   * Creates an instance of dual slider component.
   *
   * @param overlay The overlay service used to create the slider popover.
   * @param element A reference to the component's element. Used during event handling.
   * @param ga Analytics service
   */
  constructor(
    overlay: Overlay,
    private element: ElementRef<HTMLElement>,
    private readonly ga: GoogleAnalyticsService
  ) {
    const position: ConnectedPosition = { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' };
    const positionStrategy = overlay.position().flexibleConnectedTo(element).withPositions([position]);
    this.overlayRef = overlay.create({
      panelClass: 'slider-pane',
      positionStrategy
    });
  }

  /**
   * Updates slider options (with optionsChanged) and selection when changes detected.
   *
   * @param changes Changes that have been made to the slider properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.valueRange) {
      this.optionsChanged();
    }
    if (changes.selection) {
      // Detect when selection is changed and update low/high value.
      this.lowValue = Math.min(...this.selection);
      this.highValue = Math.max(...this.selection);
    }
  }

  /**
   * Updates the slider options, and the slider values if necessary.
   */
  optionsChanged(): void {
    this.options = {
      floor: this.valueRange ? this.valueRange[0] : 0,
      ceil: this.valueRange ? this.valueRange[1] : 0,
      step: 1,
      hideLimitLabels: true,
      hidePointerLabels: true
    };
    this.lowValue = this.options.floor ?? 0;
    this.highValue = this.options.ceil ?? 0;
  }

  /**
   * Angular's OnDestroy hook.
   * Cleans up the overlay.
   */
  ngOnDestroy(): void {
    this.overlayRef.dispose();
  }

  /**
   * Listens to document click, mouse movement, and touch event.
   * Closes the slider popover when such an event occurs outside the button or popover.
   *
   * @param target The element on which the event was fired.
   */
  @HostListener('document:click', ['$event.target']) // eslint-disable-line
  // eslint-disable-line
  @HostListener('document:touchstart', ['$event.target']) // eslint-disable-line
  closeSliderPopover(target: HTMLElement): void {
    const { element, isSliderOpen, popoverElement } = this;
    if (!isSliderOpen) {
      return;
    } else if (element.nativeElement.contains(target)) {
      return;
    } else if (popoverElement?.nativeElement?.contains?.(target)) {
      return;
    }

    this.overlayRef.detach();
    this.isSliderInitialized = false;
    this.isSliderOpen = false;
    this.contentsVisible = 'invisible';
  }

  /**
   * Toggles the visibility of the slider popover.
   */
  toggleSliderPopover(): void {
    const { isSliderOpen, isSliderInitialized } = this;
    if (isSliderInitialized) {
      this.overlayRef.detach();
      this.isSliderInitialized = false;
    } else if (!isSliderInitialized && !isSliderOpen) {
      this.initializeSliderPopover();
    }

    this.contentsVisible = this.contentsVisible === 'visible' ? 'invisible' : 'visible';
    this.isSliderOpen = !isSliderOpen;
  }

  /**
   * Handler for updates to the slider values.
   * Emits the updated selection value array.
   */
  sliderValueChanged(): void {
    const { lowValue, highValue } = this;

    this.selection = [lowValue, highValue];
    this.ga.event('slider_range_change', 'dual_slider', `${this.label}:${lowValue}:${highValue}`);
    this.selectionChange.emit(this.selection);
  }

  /**
   * Creates and initializes the slider popover.
   */
  private initializeSliderPopover(): void {
    const { overlayRef, popoverPortal } = this;

    overlayRef.attach(popoverPortal);
    overlayRef.updatePosition();

    this.isSliderInitialized = true;
  }

  /**
   * Updates the slider's low pointer value when Enter key is pressed.
   *
   * @param event Event passed into the component
   */
  onKeyLow(event: KeyboardEvent): void {
    const newValue = Number((event.target as HTMLInputElement).value);
    if (event.key === 'Enter') {
      if (newValue >= Number(this.options.floor) && newValue <= Number(this.options.ceil)) {
        this.lowValue = newValue;
      }
      (event.target as HTMLInputElement).value = String(this.lowValue);
      (event.target as HTMLInputElement).blur();
      this.sliderValueChanged();
    }
  }

  /**
   * Updates the slider's high pointer value when Enter key is pressed.
   *
   * @param event Event passed into the component
   */
  onKeyHigh(event: KeyboardEvent): void {
    const newValue = Number((event.target as HTMLInputElement).value);
    if (event.key === 'Enter') {
      if (newValue >= Number(this.options.floor) && newValue <= Number(this.options.ceil)) {
        this.highValue = newValue;
      }
      (event.target as HTMLInputElement).value = String(this.highValue);
      (event.target as HTMLInputElement).blur();
      this.sliderValueChanged();
    }
  }
}
