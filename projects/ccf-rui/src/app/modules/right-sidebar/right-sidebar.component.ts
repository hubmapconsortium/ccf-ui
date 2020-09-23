import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { ModelState } from '../../core/store/model/model.state';
import { RegistrationState } from '../../core/store/registration/registration.state';
import { PageState } from '../../core/store/page/page.state';


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
    { tag: 'renal', color: '#992661' }
  ];

  /**
   * Creates an instance of right sidebar component.
   *
   * @param model Model state service
   * @param registration Registration state service
   * @param page The page state
   */
  constructor(
    readonly model: ModelState,
    readonly registration: RegistrationState,
    readonly page: PageState
  ) { }

  fakeAutocomplete(): unknown {
    return [[
      {
        id: 1,
        label: 'foo',
        decorations: [{
          styles: {
            'text-decoration': 'underline'
          }
        }]
      },
      {
        id: 2,
        label: 'bar'
      }
    ]];
  }
}
