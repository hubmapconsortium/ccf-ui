import { Component, Output, EventEmitter, Input, HostBinding } from '@angular/core';

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

  /**
   * List of organs in the carousel
   */
  @Input() organList: OrganInfo[] = [];

  /**
   * Currently selected organ
   */
  @Input() selectedOrgan: string;

  /**
   * Emits the name of the organ when selected
   */
  @Output() organChanged = new EventEmitter<string>();

  /**
   * Determines whether the carousel is at the beginning
   */
  onLeft = true;

  /**
   * Determines whether the carousel is at the end
   */
  onRight = false;

  /**
   * Scrolls the carousel left or right by one step.
   * Prevents scrolling past the beginning or end of the carousel.
   * @param dir Direction to be scrolled
   * @param step Size of step (px)
   */
  shift(dir: string, step: number): void {
    if (this.onLeft && dir === 'left') {
      return;
    } else if (this.onRight && dir === 'right') {
      return;
    }
    const element = document.getElementsByClassName('carousel-item-list')[0] as HTMLElement;
    let val = parseInt(element.style.left, 10) || 0;
    val = dir === 'right' ? val -= step : val += step;
    element.style.left = val+'px';
    this.onLeft = val === 0 ? true : false;
    this.onRight = val === step*(5 - this.organList.length) ? true : false;
  }

  /**
   * Sets currently selected organ and emits the organ name
   * @param icon The icon selected
   */
  selectOrgan(icon: OrganInfo): void {
    this.selectedOrgan = icon.name;
    this.organChanged.emit(icon.name);
  }

  /**
   * Determines whether an icon represents the currently selected organ
   * @param icon The icon of interest
   * @returns true if selected
   */
  isSelected(icon: OrganInfo): boolean {
    return this.selectedOrgan === icon.name;
  }
}
