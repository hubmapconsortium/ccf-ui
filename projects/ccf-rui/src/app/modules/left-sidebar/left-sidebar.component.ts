import { ChangeDetectionStrategy, Component, HostBinding, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { VisibilityItem } from '../../core/models/visibility-item';

import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { OrganInfo } from '../../shared/components/organ-selector/organ-selector.component';

import { ResizeSensor } from 'css-element-queries';

@Component({
  selector: 'ccf-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidebarComponent implements AfterViewInit {
  /** HTML class name */
  @HostBinding('class') clsName = 'ccf-left-sidebar';

  readonly genderByLabel$ = this.model.gender$.pipe(
    map(gender => gender === 'female' ? 'Female' : 'Male')
  );

  readonly sideByLabel$ = this.model.side$.pipe(
    map(side => side === 'left' ? 'L' : 'R')
  );

  readonly organSelected$ = this.model.organ$.pipe(
    map(organ => organ === '' ? false : true)
  );

  /**
   * Variable that keeps track of the extraction site tooltip to display on
   * the stage when hovered.
   */
  extractionSiteTooltip = '';

  /**
   * Keeps track of the previousVisibility items so we can set the opacity
   * back to what it was before we changed them to 20%
   */
  previousVisibilityItems = [...this.model.snapshot.anatomicalStructures] as VisibilityItem[];

  detailsLabels: string[] = ['heart', 'front', 'female'];

  organList: OrganInfo[] = [
    { src: 'app:colon', name: 'Colon', hasSides: false, hasSex: true },
    { src: 'app:heart', name: 'Heart', hasSides: false, hasSex: true },
    { src: 'app:kidney', name: 'Kidney', hasSides: true, hasSex: true },
    { src: 'app:spleen', name: 'Spleen', hasSides: false, hasSex: true },
    { src: 'app:bladder', name: 'Bladder', disabled: true, hasSides: false, hasSex: true },
    { src: 'app:brain', name: 'Brain', disabled: true, hasSides: false, hasSex: true },
    { src: 'app:liver', name: 'Liver', disabled: true, hasSides: false, hasSex: true },
    { src: 'app:lung', name: 'Lung', disabled: true, hasSides: true, hasSex: true },
    { src: 'app:lymph_nodes', name: 'Lymph Nodes', disabled: true, hasSides: false, hasSex: true },
    { src: 'app:ovaries', name: 'Ovaries', disabled: true, hasSides: true, hasSex: false },
    { src: 'app:small_intestine', name: 'Small Intestine', disabled: true, hasSides: false, hasSex: true },
    { src: 'app:stomach', name: 'Stomach', disabled: true, hasSides: false, hasSex: true },
    { src: 'app:thymus', name: 'Thymus', disabled: true, hasSides: false, hasSex: true }
  ];

  /**
   * Sensor for detecting changes in size of an element
   */
  private sensor: ResizeSensor;

  /**
   * Determines if scrollbar is active;
   */
  scrollbarOn = false;

  /**
   * Creates an instance of left sidebar component.
   * @param page The page state
   * @param model Model state service
   * @param cdr Change detector
   */
  constructor(readonly page: PageState, readonly model: ModelState, private cdr: ChangeDetectorRef) { }

  /**
   * ResizeSensor senses changes in sidebar container height and sets scrollbarOn to true if greater than drawer height
   */
  ngAfterViewInit(): void {
    const container = document.getElementsByClassName('container')[0] as HTMLElement;
    const drawer = document.getElementsByClassName('ccf-drawer')[0] as HTMLElement;
    const drawerHeight = parseInt(getComputedStyle(drawer).height, 10);
    this.sensor = new ResizeSensor(container, () => {
      const containerHeight = parseInt(getComputedStyle(container).height, 10);
      this.scrollbarOn = containerHeight > drawerHeight ? true : false;
      this.clsName = this.scrollbarOn ? 'ccf-left-sidebar scroll' : 'ccf-left-sidebar';
      this.cdr.detectChanges();
    });
  }


  /**
   * Updates extraction site tooltip to either the VisibilityItem passed in's
   * tooltip property, or an empty string if undefined.
   * @param item The VisibilityItem which we want to show the tooltip of, or
   * undefined.
   */
  updateExtractionSiteTooltip(item: VisibilityItem | undefined): void {
    if (item?.tooltip) {
      this.extractionSiteTooltip = item.tooltip;
    } else {
      this.extractionSiteTooltip = '';
    }
  }

  setGenderFromLabel(label: 'Female' | 'Male'): void {
    this.model.setGender(label === 'Female' ? 'female' : 'male');
  }

  setSideFromLabel(label: 'L' | 'R'): void {
    this.model.setSide(label === 'L' ? 'left' : 'right');
  }

  /**
   * Handles toggling previous registration blocks visibility.
   * When making them visible, it updates current structures to 20%
   * opacity; when making not visible it sets them back to their
   * previous opacity.
   * @param visible the state to set the visibility to.
   */
  togglePreviousRegistrationBlocks(visible: boolean): void {
    if (visible) {
      this.previousVisibilityItems = [...this.model.snapshot.anatomicalStructures];
    }
    this.model.toggleRegistrationBlocksVisibility(visible, this.previousVisibilityItems);
  }
}
