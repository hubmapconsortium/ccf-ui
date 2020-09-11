import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { ModelState } from '../../core/store/model/model.state';
import { RegistrationState } from '../../core/store/registration/registration.state';


@Component({
  selector: 'ccf-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSidebarComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-right-sidebar';

  readonly placeholderTags = [
    { tag: 'calyces' },
    { tag: 'capsule' },
    { tag: 'medulla' },
    { tag: 'outer cortex' },
    { tag: 'papilla' },
    { tag: 'pyramids' },
    { tag: 'renal', color: 'pink' }
  ];

  /**
   * Creates an instance of right sidebar component.
   *
   * @param model Model state service
   * @param registration Registration state service
   */
  constructor(readonly model: ModelState, readonly registration: RegistrationState) {}
}
