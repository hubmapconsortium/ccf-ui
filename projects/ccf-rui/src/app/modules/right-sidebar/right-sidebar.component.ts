import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { ModelState } from '../../core/store/model/model.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { PageState } from '../../core/store/page/page.state';
import { AnatomicalStructureTagState } from '../../core/store/anatomical-structure-tags/anatomical-structure-tags.state';


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
   * @param model Model state service
   * @param registration Registration state service
   * @param page The page state
   * @param astags The anatomical structure tags state
   */
  constructor(
    readonly model: ModelState,
    readonly registration: RegistrationState,
    readonly page: PageState,
    readonly astags: AnatomicalStructureTagState
  ) { }
}
