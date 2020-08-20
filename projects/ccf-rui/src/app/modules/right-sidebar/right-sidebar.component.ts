import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { StageState } from '../../core/store/stage/stage.state';


@Component({
  selector: 'ccf-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSidebarComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-right-sidebar';

  /**
   * Creates an instance of right sidebar component.
   *
   * @param stage Stage state service.
   */
  constructor(readonly stage: StageState) {}
}
