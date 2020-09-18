import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { map } from 'rxjs/operators';
import { VisibilityItem } from '../../core/models/visibility-item';

import { ModelState } from '../../core/store/model/model.state';
import { PageState } from '../../core/store/page/page.state';
import { OrganInfo } from '../../shared/components/organ-selector/organ-selector.component';

@Component({
  selector: 'ccf-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidebarComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-left-sidebar';

  readonly genderByLabel$ = this.model.gender$.pipe(
    map(gender => gender === 'female' ? 'Female' : 'Male')
  );

  readonly sideByLabel$ = this.model.side$.pipe(
    map(side => side === 'left' ? 'L' : 'R')
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
    { src: 'app:colon', name: 'Colon' },
    { src: 'app:heart', name: 'Heart' },
    { src: 'app:kidney', name: 'Kidney' },
    { src: 'app:spleen', name: 'Spleen' },
    { src: 'app:bladder', name: 'Bladder', disabled: true },
    { src: 'app:brain', name: 'Brain', disabled: true },
    { src: 'app:liver', name: 'Liver', disabled: true },
    { src: 'app:lung', name: 'Lung', disabled: true },
    { src: 'app:lymph_nodes', name: 'Lymph Nodes', disabled: true },
    { src: 'app:ovaries', name: 'Ovaries', disabled: true },
    { src: 'app:small_intestine', name: 'Small Intestine', disabled: true },
    { src: 'app:stomach', name: 'Stomach', disabled: true },
    { src: 'app:thymus', name: 'Thymus', disabled: true }
  ];

  constructor(readonly page: PageState, readonly model: ModelState) { }


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
