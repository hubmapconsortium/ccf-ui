import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { SpatialEntityJsonLd } from 'ccf-body-ui';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VisibilityItem } from '../../core/models/visibility-item';
import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { RUI_ORGANS } from './../../core/store/model/model.state';


@Component({
  selector: 'ccf-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidebarComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-left-sidebar';

  @Input() disableSlider = false;

  readonly sexByLabel$ = this.model.sex$.pipe(
    map(sex => sex === 'female' ? 'Female' : 'Male')
  );

  readonly sideByLabel$ = this.model.side$.pipe(
    map(side => side === 'left' ? 'L' : 'R')
  );

  readonly organSelected$ = this.model.organ$.pipe(
    map(organ => organ === undefined ? false : true)
  );

  readonly detailsLabels$: Observable<string[]> = combineLatest(
    [this.model.organ$, this.model.side$, this.model.sex$]).pipe(
      map(([organ, side, sex]) => [organ?.name as string, side as string, sex as string])
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

  organList = RUI_ORGANS;

  constructor(
    readonly page: PageState,
    readonly model: ModelState,
    readonly registration: RegistrationState
  ) { }


  /**
   * Updates extraction site tooltip to either the VisibilityItem passed in's
   * tooltip property, or an empty string if undefined.
   *
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

  /**
   * Sets sex from sex toggle slider
   *
   * @param label Selected sex
   */
  setSexFromLabel(label: 'Female' | 'Male'): void {
    this.model.setSex(label === 'Female' ? 'female' : 'male');
  }

  /**
   * Sets side from side toggle slider
   *
   * @param label Selected side
   */
  setSideFromLabel(label: 'L' | 'R'): void {
    this.model.setSide(label === 'L' ? 'left' : 'right');
  }

  /**
   * Handles toggling previous registration blocks visibility.
   * When making them visible, it updates current structures to 20%
   * opacity; when making not visible it sets them back to their
   * previous opacity.
   *
   * @param visible the state to set the visibility to.
   */
  togglePreviousRegistrationBlocks(visible: boolean): void {
    if (visible) {
      this.previousVisibilityItems = [...this.model.snapshot.anatomicalStructures];
    }
    this.model.toggleRegistrationBlocksVisibility(visible, this.previousVisibilityItems);
  }

  /**
   * Event handler for capturing uploaded json and passing it along to
   * the relevant registration state method.
   *
   * @param event the new registration state json
   */
  updateRegistration(event: SpatialEntityJsonLd): void {
    this.registration.editRegistration(event);
  }
}
