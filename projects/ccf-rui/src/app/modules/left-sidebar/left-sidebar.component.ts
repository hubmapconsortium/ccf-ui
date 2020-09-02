import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

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

  load = false;

  detailsLabels: string[] = ['heart', 'front', 'female'];

  extractionSites: VisibilityItem[] = [
    {id: 1, name: 'Left atrium, appendage', visible: false, iconSrc: 'app:visibility_off'},
    {id: 2, name: 'Left atrium, PV inflow', visible: false, iconSrc: 'app:visibility_off'},
    {id: 3, name: 'Left ventricle, apex', visible: false, iconSrc: 'app:visibility_off'},
    {id: 4, name: 'Left ventricle, free wall 3cm from apex', visible: false, iconSrc: 'app:visibility_off'},
    {id: 5, name: 'Septum, 3cm from apex including LAD', visible: false, iconSrc: 'app:visibility_off'},
    {id: 6, name: 'Posterior, adjacent to coronary sinus', visible: false, iconSrc: 'app:visibility_off'},
    {id: 7, name: 'Right atrium appendage', visible: false, iconSrc: 'app:visibility_off'},
    {id: 8, name: 'Right atrium, AV(atrioventricular) node', visible: false, iconSrc: 'app:visibility_off'},
    {id: 9, name: 'Right atrium, SA(sinoatrial) node', visible: false, iconSrc: 'app:visibility_off'},
    {id: 10, name: 'Right ventricle, free wall 3cm from apex', visible: false, iconSrc: 'app:visibility_off'}
  ];

  anatomicalStructures: VisibilityItem[] = [
    {id: 1, name: 'Structure A', visible: false, iconSrc: 'app:visibility_off', opacity: 100},
    {id: 2, name: 'Structure B', visible: false, iconSrc: 'app:visibility_off', opacity: 100},
    {id: 3, name: 'Structure C', visible: false, iconSrc: 'app:visibility_off', opacity: 100}
  ];

  constructor(readonly page: PageState) {}
}
