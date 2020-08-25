import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { PageState } from '../../core/store/page/page.state';
import { VisibilityItem } from '../../shared/components/visibility-menu/visibility-menu.component';

@Component({
  selector: 'ccf-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidebarComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-left-sidebar';

  detailsLabels: string[] = ['heart', 'front', 'female'];

  extractionSites: VisibilityItem[] =
    [
      {name: 'Left atrium, appendage', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
      {name: 'Left atrium, PV inflow', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
      {name: 'Left ventricle, apex', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
      {name: 'Left ventricle, free wall 3cm from apex', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
      {name: 'Septum, 3cm from apex including LAD', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
      {name: 'Posterior, adjacent to coronary sinus', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
      {name: 'Right atrium appendage', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
      {name: 'Right atrium, AV(atrioventricular) node', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
      {name: 'Right atrium, SA(sinoatrial) node', selected: false, highlighted: false, iconSrc: 'app:visibility_off'},
      {name: 'Right ventricle, free wall 3cm from apex', selected: false, highlighted: false, iconSrc: 'app:visibility_off'}
    ]

  constructor(readonly page: PageState) {}
}
