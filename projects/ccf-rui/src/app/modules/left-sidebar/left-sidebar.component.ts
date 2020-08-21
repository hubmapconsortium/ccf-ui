import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { PageState } from '../../core/store/page/page.state';


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

  constructor(readonly page: PageState) {}
}
