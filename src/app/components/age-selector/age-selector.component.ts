import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { Options } from 'ng5-slider';

import { SearchService, ageConstraints } from '../../shared/services/search/search.service';

/**
 * Component containing a button that when clicked will show a slider popover.
 */
@Component({
  selector: 'ccf-age-selector',
  templateUrl: './age-selector.component.html',
  styleUrls: ['./age-selector.component.scss']
})
export class AgeSelectorComponent implements OnDestroy {
  /**
   * Reference to the template for the slider popover.
   */
  @ViewChild(CdkPortal) popoverPortal: CdkPortal;

  /**
   * Reference to the popover element.
   * This is undefined until the slider popover is initialized.
   */
  @ViewChild('popover', { read: ElementRef }) popoverElement: ElementRef;

  /**
   * Determines whether slider popover is shown.
   */
  isSliderOpen = false;

  /**
   * Slider options.
   */
  options: Options = {
    floor: ageConstraints.min,
    ceil: ageConstraints.max,
    step: 1,
    hideLimitLabels: true,
    hidePointerLabels: true
  };

  /**
   * Value bound to the sliders low pointer value.
   */
  lowValue: number = this.options.floor;

  /**
   * Value bound to the sliders high pointer value.
   */
  highValue: number = this.options.ceil;

  /**
   * Computes the current age range for display in the button.
   */
  get ageRangeLabel(): string {
    const { lowValue, highValue, options: { ceil } } = this;
    const suffix = highValue === ceil ? '+' : '';
    if (lowValue === highValue) {
      return `Age: ${lowValue}${suffix}`;
    }
    return `Age: ${lowValue}-${highValue}${suffix}`;
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
   * Creates an instance of age selector component.
   *
   * @param overlay The overlay service used to create the slider popover.
   * @param element A reference to the component's element. Used during event handling.
   * @param search Service providing functionality for updating the search state.
   */
  constructor(
    overlay: Overlay,
    private element: ElementRef,
    private search: SearchService
  ) {
    const position: ConnectedPosition = { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' };
    const positionStrategy = overlay.position().flexibleConnectedTo(element).withPositions([position]);
    this.overlayRef = overlay.create({
      panelClass: 'age-selector-pane',
      positionStrategy
    });
  }

  /**
   * Angular's OnDestroy hook.
   * Cleans up the overlay.
   */
  ngOnDestroy() {
    this.overlayRef.dispose();
  }

  /**
   * Listens to document click and touch event.
   * Closes the slider popover when such an event occurs outside the button or popover.
   *
   * @param target The element on which the event was fired.
   */
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

  /**
   * Toggles the visibility of the slider popover.
   */
  toggleSliderPopover(): void {
    const { isSliderOpen, isSliderInitialized } = this;
    if (!isSliderInitialized && !isSliderOpen) { this.initializeSliderPopover(); }
    this.isSliderOpen = !isSliderOpen;
  }

  /**
   * Handler for updates to the slider values.
   * Updates the search state with the new age range.
   */
  sliderValueChanged(): void {
    const { lowValue, highValue, options: { floor, ceil }, search } = this;
    const min = lowValue !== floor ? lowValue : undefined;
    const max = highValue !== ceil ? highValue : undefined;
    search.setAgeRange(min, max);
  }

  /**
   * Creates and initialized the slider popover.
   */
  private initializeSliderPopover(): void {
    const { overlayRef, popoverPortal } = this;

    overlayRef.attach(popoverPortal);
    overlayRef.updatePosition();

    this.isSliderInitialized = true;
  }
}
