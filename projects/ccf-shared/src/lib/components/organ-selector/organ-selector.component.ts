import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, Input,
  OnChanges, OnDestroy, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { ResizeSensor } from 'css-element-queries';

/**
 * All organs that will eventually be displayed in the app
 */
export const ALL_POSSIBLE_ORGANS = [
  {
    src: 'app:skin',
    organ: 'Skin',
    name: 'Skin',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002097'
  },
  {
    src: 'app:brain',
    organ: 'Brain',
    name: 'Brain',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000955'
  },
  {
    disabled: true,
    src: 'app:lymph-nodes',
    organ: 'Lymph Node',
    name: 'Lymph Node',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000029'
  },
  {
    src: 'app:lymph-nodes',
    organ: 'Lymph Node',
    name: 'Lymph Node',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002509'
  },
  {
    disabled: true,
    src: 'app:eye',
    organ: 'Eye',
    name: 'Eye, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000970'
  },
  {
    src: 'app:eye',
    organ: 'Eye',
    name: 'Eye, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004548'
  },
  {
    src: 'app:eye',
    organ: 'Eye',
    name: 'Eye, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004549'
  },
  {
    disabled: true,
    src: 'app:fallopian-tube-left',
    organ: 'Fallopian Tube',
    name: 'Fallopian Tube, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0003889'
  },
  {
    src: 'app:fallopian-tube-left',
    organ: 'Fallopian Tube',
    name: 'Fallopian Tube, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0001303'
  },
  {
    src: 'app:fallopian-tube-right',
    organ: 'Fallopian Tube',
    name: 'Fallopian Tube, R',
    side: 'right',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0001302'
  },
  {
    src: 'app:heart',
    organ: 'Heart',
    name: 'Heart',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000948'
  },
  {
    disabled: true,
    src: 'app:kidney-left',
    organ: 'Kidney',
    name: 'Kidney, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002113'
  },
  {
    src: 'app:kidney-left',
    organ: 'Kidney',
    name: 'Kidney, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004538'
  },
  {
    src: 'app:kidney-right',
    organ: 'Kidney',
    name: 'Kidney, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004539'
  },
  {
    disabled: true,
    src: 'app:knee',
    organ: 'Knee',
    name: 'Knee, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001465'
  },
  {
    src: 'app:knee',
    organ: 'Knee',
    name: 'Knee, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.org/sig/ont/fma/fma24978'
  },
  {
    src: 'app:knee',
    organ: 'Knee',
    name: 'Knee, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.org/sig/ont/fma/fma24977'
  },
  {
    src: 'app:liver',
    organ: 'Liver',
    name: 'Liver',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002107'
  },
  {
    disabled: true,
    src: 'app:lung',
    organ: 'Lung',
    name: 'Lungs',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002048'
  },
  {
    src: 'app:lung',
    organ: 'Lung',
    name: 'Lungs',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001004'
  },
  {
    disabled: true,
    src: 'app:mammary-gland',
    organ: 'Mammary Gland',
    name: 'Mammary Gland, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0001911'
  },
  {
    src: 'app:mammary-gland',
    organ: 'Mammary Gland',
    name: 'Mammary Gland, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.org/sig/ont/fma/fma57991'
  },
  {
    src: 'app:mammary-gland',
    organ: 'Mammary Gland',
    name: 'Mammary Gland, R',
    side: 'right',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.org/sig/ont/fma/fma57987'
  },
  {
    disabled: true,
    src: 'app:ovary-left',
    organ: 'Ovary',
    name: 'Ovary, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0000992'
  },
  {
    src: 'app:ovary-left',
    organ: 'Ovary',
    name: 'Ovary, L',
    side: 'left',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.org/sig/ont/fma/fma7214'
  },
  {
    src: 'app:ovary-right',
    organ: 'Ovary',
    name: 'Ovary, R',
    side: 'right',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.org/sig/ont/fma/fma7213'
  },
  {
    src: 'app:larynx',
    organ: 'Larynx',
    name: 'Larynx',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001737'
  },
  {
    src: 'app:main-bronchus',
    organ: 'Main Bronchus',
    name: 'Main Bronchus',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002182'
  },
  {
    disabled: true,
    src: 'app:palatine-tonsil',
    organ: 'Palatine Tonsil',
    name: 'Palatine Tonsil, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002373'
  },
  {
    src: 'app:palatine-tonsil',
    organ: 'Palatine Tonsil',
    name: 'Palatine Tonsil, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.org/sig/ont/fma/fma54974'
  },
  {
    src: 'app:palatine-tonsil',
    organ: 'Palatine Tonsil',
    name: 'Palatine Tonsil, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.org/sig/ont/fma/fma54973'
  },
  {
    src: 'app:pancreas',
    organ: 'Pancreas',
    name: 'Pancreas',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001264'
  },
  {
    src: 'app:pelvis-f',
    organ: 'Pelvis',
    name: 'Pelvis',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001270'
  },
  {
    src: 'app:placenta',
    organ: 'Placenta',
    name: 'Placenta',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0001987'
  },
  {
    src: 'app:prostate',
    organ: 'Prostate',
    name: 'Prostate',
    hasSex: false,
    sex: 'male',
    id: 'http://purl.obolibrary.org/obo/UBERON_0002367',
    disabled: true
  },
  {
    src: 'app:prostate',
    organ: 'Prostate',
    name: 'Prostate',
    hasSex: false,
    sex: 'male',
    id: 'http://purl.obolibrary.org/obo/UBERON_0000079'
  },
  {
    src: 'app:small-intestine',
    organ: 'Small Intestine',
    name: 'Small Intestine',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002108'
  },
  {
    src: 'app:large-intestine',
    organ: 'Large Intestine',
    name: 'Large Intestine',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000059'
  },
  {
    src: 'app:spinal-cord',
    organ: 'Spinal Cord',
    name: 'Spinal Cord',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002240'
  },
  {
    src: 'app:spleen',
    organ: 'Spleen',
    name: 'Spleen',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002106'
  },
  {
    src: 'app:thymus',
    organ: 'Thymus',
    name: 'Thymus',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002370'
  },
  {
    src: 'app:trachea',
    organ: 'Trachea',
    name: 'Trachea',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0003126'
  },
  {
    disabled: true,
    src: 'app:ureter-left',
    organ: 'Ureter',
    name: 'Ureter, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0000056'
  },
  {
    src: 'app:ureter-left',
    organ: 'Ureter',
    name: 'Ureter, L',
    side: 'left',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001223'
  },
  {
    src: 'app:ureter-right',
    organ: 'Ureter',
    name: 'Ureter, R',
    side: 'right',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001222'
  },
  {
    src: 'app:bladder',
    organ: 'Urinary Bladder',
    name: 'Urinary Bladder',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0001255'
  },
  {
    src: 'app:uterus',
    organ: 'Uterus',
    name: 'Uterus',
    hasSex: false,
    sex: 'female',
    id: 'http://purl.obolibrary.org/obo/UBERON_0000995'
  },
  {
    src: 'app:vasculature-thick',
    organ: 'Blood Vasculature',
    name: 'Blood Vasculature',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0004537'
  },
  {
    disabled: true,
    src: 'app:vasculature-thick',
    organ: 'Blood Vasculature',
    name: 'Blood Vasculature',
    hasSex: true,
    id: 'http://purl.obolibrary.org/obo/UBERON_0002049'
  }
].sort((a, b) => a.name.localeCompare(b.name)) as OrganInfo[];

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
   * Used for single sex only organs
   */
  sex?: 'male' | 'female';

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
  styleUrls: ['./organ-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganSelectorComponent implements AfterViewInit, OnChanges, OnDestroy {
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
   * If the organ selector is expanded
   */
  @Input() expanded = false;

  /**
   * Emits the name of the organ when selected
   */
  @Output() readonly organsChanged = new EventEmitter<OrganInfo[]>();

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

  // eslint-disable-next-line
  @Input()
  set occurenceData(value: Record<string, number>) {
    // eslint-disable-next-line
    this._occurenceData = value;
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
    const { carouselContainer } = this;
    this.sensor = new ResizeSensor(carouselContainer.nativeElement, () => {
      this.set();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('organList' in changes) {
      this.set();
    }
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
    if (!this.displayErrors || this.selectedOrgans.length === 0) {
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
    itemList.nativeElement.style.left = val + 'px';
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
      clearInterval(this.timeoutHandler as never);
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
    const { itemList, itemContainer, carouselContainer } = this;
    const val = parseInt(itemList.nativeElement.style.left, 10) || 0;
    if (itemList.nativeElement.offsetWidth >= this.organList.length * this.step) {
      itemList.nativeElement.style.left = '0px';
      this.onLeft = true;
      this.onRight = true;
    } else {
      this.setLeftRight(val);
      const listLength = this.step * Math.floor(carouselContainer.nativeElement.offsetWidth / this.step) - 64;
      itemContainer.nativeElement.style.width = `${listLength}px`;
    }
  }

  /**
   * Responsively sets width of the item container
   */
  setWidth(): void {
    const { itemContainer, carouselContainer } = this;
    const listLength = this.step * Math.floor(carouselContainer.nativeElement.offsetWidth / this.step) - 64;
    itemContainer.nativeElement.style.width = `${listLength}px`;
  }

  /**
   * Sets onLeft and onRight according to where the item list is scrolled
   */
  setLeftRight(val: number): void {
    const { itemContainer } = this;
    this.onLeft = val === 0 ? true : false;
    this.onRight = val <= (itemContainer.nativeElement.offsetWidth - this.organList.length * this.step) ? true : false;
  }
}
