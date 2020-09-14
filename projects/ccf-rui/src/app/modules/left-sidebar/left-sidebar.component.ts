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

  extractionSiteTooltip = '';

  detailsLabels: string[] = ['heart', 'front', 'female'];

  organList: OrganInfo[] = [
    {src: 'app:colon', name: 'Colon'},
    {src: 'app:heart', name: 'Heart'},
    {src: 'app:kidney', name: 'Kidney'},
    {src: 'app:spleen', name: 'Spleen'},
    {src: 'app:bladder', name: 'Bladder', disabled: true},
    {src: 'app:brain', name: 'Brain', disabled: true},
    {src: 'app:liver', name: 'Liver', disabled: true},
    {src: 'app:lung', name: 'Lung', disabled: true},
    {src: 'app:lymph_nodes', name: 'Lymph Nodes', disabled: true},
    {src: 'app:ovaries', name: 'Ovaries', disabled: true},
    {src: 'app:small_intestine', name: 'Small Intestine', disabled: true},
    {src: 'app:stomach', name: 'Stomach', disabled: true},
    {src: 'app:thymus', name: 'Thymus', disabled: true}
  ];

  constructor(readonly page: PageState, readonly model: ModelState) { }

  updateExtractionSiteTooltip(item: VisibilityItem): void {
    if(item?.tooltip) {
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
}
