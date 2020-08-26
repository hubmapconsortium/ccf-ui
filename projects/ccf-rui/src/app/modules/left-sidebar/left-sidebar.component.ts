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

  extractionSites: VisibilityItem[] = [
    {name: 'Left atrium, appendage', highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Left atrium, PV inflow', highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Left ventricle, apex', highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Left ventricle, free wall 3cm from apex', highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Septum, 3cm from apex including LAD', highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Posterior, adjacent to coronary sinus', highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Right atrium appendage', highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Right atrium, AV(atrioventricular) node', highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Right atrium, SA(sinoatrial) node', highlighted: false, iconSrc: 'app:visibility_off'},
    {name: 'Right ventricle, free wall 3cm from apex', highlighted: false, iconSrc: 'app:visibility_off'}
  ];

  anatomicalStructures: VisibilityItem[] = [
    {name: 'Structure A', highlighted: false, iconSrc: 'app:visibility_off', opacity: 100},
    {name: 'Structure B', highlighted: false, iconSrc: 'app:visibility_off', opacity: 100},
    {name: 'Structure C', highlighted: false, iconSrc: 'app:visibility_off', opacity: 100}
  ];

  constructor(readonly page: PageState) {}
}
