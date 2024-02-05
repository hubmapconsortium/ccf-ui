import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

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

  @Input() homeUrl!: string;

  @Input() logoTooltip!: string;

  /**
   * Creates an instance of header component.
   *
   * @param page Page data.
   */
  constructor(readonly page: PageState) { }
}
