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
  ) {
    // FIXME: Temporary for testing
    astags.addMany([
      { id: 0, label: 'calyces', type: 'assigned' },
      { id: 1, label: 'capsule', type: 'assigned' },
      { id: 2, label: 'medulla', type: 'assigned' },
      { id: 3, label: 'outer cortex', type: 'assigned' },
      { id: 4, label: 'papilla', type: 'assigned' },
      { id: 5, label: 'pyramids', type: 'assigned' },
      { id: 6, label: 'renal', type: 'added' }
    ]);
  }

  fakeAutocomplete(): unknown {
    return [[
      {
        id: 1,
        label: 'foo'
      },
      {
        id: 2,
        label: 'bar'
      }
    ]];
  }
}
