import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { PageState } from '../../core/store/page/page.state';


/**
 * Page header
 */
@Component({
  selector: 'ccf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-header';

  /**
   * Creates an instance of header component.
   *
   * @param page Page data.
   */
  constructor(readonly page: PageState) { }
}
