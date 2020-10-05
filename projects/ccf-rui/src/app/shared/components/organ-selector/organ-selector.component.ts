import { Component, Output, EventEmitter, Input, HostBinding, HostListener } from '@angular/core';

/**
 * Contains the organ name and url of the icon svg
 */
export interface OrganInfo {

  src: string;

  /**
   * Name of the organ
   */
  name: string;

  /**
   * True if the icon is disabled
   */
  disabled?: boolean;

  /**
   * True for paired organs
   */
  hasSides?: boolean;

  /**
   * True if applies to both sexes
   */
  hasSex?: boolean;
}

/**
 * Organ carousel for selecting the organ to be viewed
 */
@Component({
  selector: 'ccf-organ-selector',
  templateUrl: './organ-selector.component.html',
  styleUrls: ['./organ-selector.component.scss']
})
export class OrganSelectorComponent {
  /** HTML class */
  @HostBinding('class') readonly clsName = 'ccf-organ-selector';

  @Input() displayErrors = false;

  /**
   * List of organs in the carousel
   */
  @Input() organList: OrganInfo[] = [];

  /**
   * Currently selected organ
   */
  @Input() selectedOrgan: OrganInfo | undefined;

  /**
   * Emits the name of the organ when selected
   */
  @Output() organChanged = new EventEmitter<OrganInfo>();

  /**
   * Determines whether the carousel is at the beginning
   */
  onLeft = true;

  /**
   * Determines whether the carousel is at the end
   */
  onRight = false;

  /**
   * Handles scrolling behavior
   */
  timeoutHandler?: unknown;

  /**
   * Distance the carousel moves in each shift (px)
   */
  step = 56;

  /**
   * Decides whether or not an error has occured,
   * used to display or hide error message.
   */
  get error(): boolean {
    if (!this.displayErrors) {
      return false;
    }

    if (!this.selectedOrgan) {
      return false;
    }

    return true;
  }

  /**
   * Scrolls the carousel left or right by one step.
   * Prevents scrolling past the beginning or end of the carousel.
   * @param dir Direction to be scrolled
   */
  shift(dir: string): void {
    if (this.onLeft && dir === 'left') {
      return;
    } else if (this.onRight && dir === 'right') {
      return;
    }
    const element = document.getElementsByClassName('carousel-item-list')[0] as HTMLElement;
    let val = parseInt(element.style.left, 10) || 0;
    val = dir === 'right' ? val -= this.step : val += this.step;
    element.style.left = val+'px';
    this.onLeft = val === 0 ? true : false;
    this.onRight = val === this.step*(5 - this.organList.length) ? true : false;
  }

  /**
   * Scrolls carousel continuously
   * @param dir Direction to be scrolled
   */
  scroll(dir: string): void {
    this.timeoutHandler = setInterval(() => {
      this.shift(dir);
    }, 200);
  }

  /**
   * Stops carousel scrolling
   */
  stopScroll(): void {
    if (this.timeoutHandler) {
      // Minor hack to make typescript happy when there are mixed NodeJS and regular typings
      clearInterval(this.timeoutHandler as undefined);
      this.timeoutHandler = undefined;
    }
  }

  /**
   * Sets currently selected organ and emits the organ name
   * @param icon The icon selected
   */
  selectOrgan(icon: OrganInfo | undefined): void {
    this.selectedOrgan = icon;
    this.organChanged.emit(icon);
  }

  /**
   * Determines whether an icon represents the currently selected organ
   * @param icon The icon of interest
   * @returns true if selected
   */
  isSelected(icon: OrganInfo): boolean {
    return this.selectedOrgan === icon;
  }
}
