import { AfterViewInit, OnDestroy, Component, EventEmitter, HostBinding, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

export const ALL_ORGANS: OrganInfo[] = [
  { src: 'app:large_intestine', name: 'Large Intestine', hasSides: false, hasSex: true },
  { src: 'app:heart', name: 'Heart', hasSides: false, hasSex: true },
  { src: 'app:kidney-right', name: 'Right Kidney', hasSides: false, hasSex: true },
  { src: 'app:kidney-left', name: 'Left Kidney', hasSides: false, hasSex: true },
  { src: 'app:spleen', name: 'Spleen', hasSides: false, hasSex: true },
  { src: 'app:bladder', name: 'Bladder', disabled: true, hasSides: false, hasSex: true },
  { src: 'app:brain', name: 'Brain', disabled: true, hasSides: false, hasSex: true },
  { src: 'app:liver', name: 'Liver', disabled: true, hasSides: false, hasSex: true },
  { src: 'app:lung-right', name: 'Right Lung', disabled: true, hasSides: false, hasSex: true },
  { src: 'app:lung-left', name: 'Left Lung', disabled: true, hasSides: false, hasSex: true },
  { src: 'app:lymph_nodes', name: 'Lymph Nodes', disabled: true, hasSides: false, hasSex: true },
  { src: 'app:ovary-left', name: 'Left Ovary', disabled: true, hasSides: false, hasSex: false },
  { src: 'app:ovary-right', name: 'Right Ovary', disabled: true, hasSides: false, hasSex: false },
  { src: 'app:small_intestine', name: 'Small Intestine', disabled: true, hasSides: false, hasSex: true },
  { src: 'app:stomach', name: 'Stomach', disabled: true, hasSides: false, hasSex: true },
  { src: 'app:thymus', name: 'Thymus', disabled: true, hasSides: false, hasSex: true }
];

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

  @ViewChild('itemlist', { static: true }) itemList: ElementRef<HTMLElement>;
  @ViewChild('itemcontainer', { static: true }) itemContainer: ElementRef<HTMLElement>;

  /**
   * If multiple selections should be allowed
   */
  @Input() multiselect = false;

  @Input() displayErrors = false;

  /**
   * List of organs in the carousel
   */
  @Input() organList: OrganInfo[] = ALL_ORGANS;

  /**
   * Currently selected organ
   */
  @Input() selectedOrgans: OrganInfo[] = [];

  /**
   * Emits the name of the organ when selected
   */
  @Output() organsChanged = new EventEmitter<OrganInfo[]>();

  @Input() hidden = false;

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
  ngAfterViewInit(): void {
    const { itemContainer } = this;
    this.sensor = new ResizeSensor(itemContainer.nativeElement, () => {
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
    const { itemList } = this;
    let val = parseInt(itemList.nativeElement.style.left, 10) || 0;
    if (this.onLeft && dir === 'left' || this.onRight && dir === 'right') {
      return;
    }
    val = dir === 'right' ? val - this.step : val + this.step;
    itemList.nativeElement.style.left = val+'px';
    this.setLeftRight(val);
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
        this.selectedOrgans = this.selectedOrgans.filter((selectedOrgan) => {
          return organ !== selectedOrgan;
        });
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
    const { itemList } = this;
    const val = parseInt(itemList.nativeElement.style.left, 10) || 0;
    if (itemList.nativeElement.offsetWidth >= this.organList.length*this.step) {
      itemList.nativeElement.style.left = '0px';
      this.onLeft = true;
      this.onRight = true;
    } else {
      this.setLeftRight(val);
    }
  }

  setLeftRight(val: number): void {
    const { itemContainer } = this;
    this.onLeft = val === 0 ? true : false;
    this.onRight = val <= (itemContainer.nativeElement.offsetWidth - this.organList.length*this.step) ? true : false;
  }
}
