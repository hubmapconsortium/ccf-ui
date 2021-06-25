import { AfterViewInit, OnDestroy, Component, EventEmitter, HostBinding, Input, Output, ElementRef, ViewChild } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

/**
 * All organs that will eventually be displayed in the app
 */
export const ALL_POSSIBLE_ORGANS: OrganInfo[] = [
  { src: 'app:skin', organ: 'Skin', name: 'Skin', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002097'},
  { src: 'app:large_intestine', organ: 'Large Intestine', name: 'Large Intestine', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000059' },
  { src: 'app:heart', organ: 'Heart', name: 'Heart', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000948'},
  { src: 'app:kidney-left', organ: 'Kidney', name: 'Kidney, L', side: 'left', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004538'},
  { src: 'app:kidney-right', organ: 'Kidney', name: 'Kidney, R', side: 'right', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004539'},
  { src: 'app:spleen', organ: 'Spleen', name: 'Spleen', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002106'},
  { src: 'app:brain', organ: 'Brain', name: 'Allen Brain', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000955'},
  { src: 'app:lung', organ: 'Lung', name: 'Lungs', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002048'},
  { src: 'app:lymph_nodes', organ: 'Lymph Node', name: 'Lymph Node, L', side: 'left', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000029'},
  { src: 'app:lymph_nodes', organ: 'Lymph Node', name: 'Lymph Node, R', side: 'right', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000029'},
  { src: 'app:bone_marrow', organ: 'Pelvis', name: 'Pelvis', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001270'},
  { src: 'app:thymus', organ: 'Thymus', name: 'Thymus', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002370'},
  { src: 'app:vasculature', organ: 'Vasculature', name: 'Vasculature', hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002049'}
];

/**
 * All organs which have not been disabled
 */
export const ALL_ORGANS = ALL_POSSIBLE_ORGANS.filter(organ => organ.disabled !== true);

/**
 * Contains the organ name and url of the icon svg
 */
export interface OrganInfo {

  /**
   * Used to fetch the url of the organ icon
   */
  src: string;

  /**
   * Label to display for the organ
   */
  name: string;

  /**
   * Name of the organ (to help match organs with left / right)
   */
  organ: string;

  /**
   * True if the icon is disabled
   */
  disabled?: boolean;

  /**
   * Used for paired organs
   */
  side?: 'left' | 'right';

  /**
   * True if applies to both sexes
   */
  hasSex?: boolean;

  /**
   * UBERON id for the organ
   */
  id?: string;
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

  @ViewChild('carouselContainer', { static: true }) carouselContainer: ElementRef<HTMLElement>;
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
  step = 72;

  /**
   * Detects resizing of carousel
   */
  private sensor: ResizeSensor;

  /**
   * Detects resizing of carousel container
   */
  private sensor2: ResizeSensor;

  // eslint-disable-next-line
  @Input()
  set occurenceData(value: Record<string, number>) {
    if (value) {
      // eslint-disable-next-line
      this._occurenceData = value;
    } else {
      // eslint-disable-next-line
      this._occurenceData = {};
    }
  }

  get occurenceData(): Record<string, number> {
    // eslint-disable-next-line
    return this._occurenceData;
  }

  private _occurenceData: Record<string, number>;

  /**
   * Set resize sensor on carousel
   */
  ngAfterViewInit(): void {
    const { itemContainer, carouselContainer } = this;
    this.sensor = new ResizeSensor(itemContainer.nativeElement, () => {
      this.set();
    });
    this.sensor2 = new ResizeSensor(carouselContainer.nativeElement, () => {
      this.setWidth();
    });
  }

  /**
   * Detaches resize sensor
   */
  ngOnDestroy(): void {
    this.sensor.detach();
    this.sensor2.detach();
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
   *
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
   *
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
   *
   * @param organ The organ selected
   */
  selectOrgan(organ: OrganInfo): void {
    if (!this.multiselect) {
      this.selectedOrgans = [organ];
    } else {
      if (this.selectedOrgans.includes(organ)) {
        this.selectedOrgans = this.selectedOrgans.filter((selectedOrgan) => organ !== selectedOrgan);
      } else {
        this.selectedOrgans = this.selectedOrgans.concat([organ]);
      }
    }
    this.organsChanged.emit(this.selectedOrgans);
  }

  /**
   * Determines whether an icon represents a currently selected organ
   *
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

  /**
   * Responsively sets width of the item container
   */
  setWidth(): void {
    const { itemContainer, carouselContainer } = this;
    const listLength = this.step*Math.floor(carouselContainer.nativeElement.offsetWidth/this.step) - 64;
    itemContainer.nativeElement.style.width = `${listLength}px`;
  }

  /**
   * Sets onLeft and onRight according to where the item list is scrolled
   */
  setLeftRight(val: number): void {
    const { itemContainer } = this;
    this.onLeft = val === 0 ? true : false;
    this.onRight = val <= (itemContainer.nativeElement.offsetWidth - this.organList.length*this.step) ? true : false;
  }
}
