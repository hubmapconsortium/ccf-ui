import { AfterViewInit, OnDestroy, Component, EventEmitter, HostBinding, Input, Output, ElementRef } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

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
export class OrganSelectorComponent implements AfterViewInit, OnDestroy {
  /** HTML class */
  @HostBinding('class') readonly clsName = 'ccf-organ-selector';

  /**
   * If multiple selections should be allowed
   */
  @Input() multiselect = false;

  @Input() displayErrors = false;

  /**
   * List of organs in the carousel
   */
  @Input() organList: OrganInfo[] = [];

  /**
   * Currently selected organ
   */
  @Input() selectedOrgans: OrganInfo[] = [];

  /**
   * Emits the name of the organ when selected
   */
  @Output() organsChanged = new EventEmitter<OrganInfo[]>();

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
   * Detects resizing of carousel
   */
  private sensor: ResizeSensor;

  /**
   * Set resize sensor on carousel
   */
  ngAfterViewInit() {
    const container = document.getElementsByClassName('carousel-item-container')[0] as HTMLElement;
    this.sensor = new ResizeSensor(container, () => {
      this.set();
    });
  }

  /**
   * Detaches resize sensor
   */
  ngOnDestroy(): void {
    this.sensor.detach();
  }

  /**
   * Decides whether or not an error has occured,
   * used to display or hide error message.
   */
  get error(): boolean {
    if (!this.displayErrors) {
      return false;
    }

    if (!this.selectedOrgans) {
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
    const element = document.getElementsByClassName('carousel-item-list')[0] as HTMLElement;
    const container = document.getElementsByClassName('carousel-item-container')[0] as HTMLElement;
    let val = parseInt(element.style.left, 10) || 0;
    if (this.onLeft && dir === 'left') {
      return;
    } else if (this.onRight && dir === 'right') {
      return;
    }
    val = dir === 'right' ? val -= this.step : val += this.step;
    element.style.left = val+'px';
    this.onLeft = val === 0 ? true : false;
    this.onRight = val <= (container.offsetWidth - this.organList.length*this.step) ? true : false;
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
   * Sets and emits currently selected organ(s)
   * @param organ The organ selected
   */
  selectOrgan(organ: OrganInfo): void {
    if (!this.multiselect) {
      this.selectedOrgans = [organ];
    } else {
      if (this.selectedOrgans.includes(organ)) {
        this.selectedOrgans = this.selectedOrgans.filter((selectedOrgan) => {return organ !== selectedOrgan})
      } else {
        this.selectedOrgans = this.selectedOrgans.concat([organ]);
      }
    }
    this.organsChanged.emit(this.selectedOrgans);
  }

  /**
   * Determines whether an icon represents a currently selected organ
   * @param icon The icon of interest
   * @returns true if selected
   */
  isSelected(organ: OrganInfo): boolean {
    return this.selectedOrgans.includes(organ) ? true : false;
  }

  /**
   * Disables scrolling if the list of organs is smaller than the container, otherwise sets onLeft and onRight as normal
   */
  set(): void {
    const element = document.getElementsByClassName('carousel-item-list')[0] as HTMLElement;
    const container = document.getElementsByClassName('carousel-item-container')[0] as HTMLElement;
    let val = parseInt(element.style.left, 10) || 0;
    if (container.offsetWidth >= this.organList.length*this.step) {
      element.style.left = '0px';
      this.onLeft = true;
      this.onRight = true;
    } else {
      this.onLeft = val === 0 ? true : false;
      this.onRight = val <= (container.offsetWidth - this.organList.length*this.step) ? true : false;
    }
  }
}
