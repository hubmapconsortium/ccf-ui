import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

import { PageState } from '../../core/store/page/page.state';


@Component({
  selector: 'ccf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @HostBinding('class') readonly clsName = 'ccf-header';

  constructor(readonly page: PageState) { }
}
