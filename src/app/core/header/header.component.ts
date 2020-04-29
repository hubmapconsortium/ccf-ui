import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


/**
 * Header which is always displayed on the site; contains current filter info,
 * a link to download data, and a logo which resets the page when clicked.
 */
@Component({
  selector: 'ccf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  /**
   * Current filter settings
   */
  @Input() filters: Record<string, unknown[] | unknown>;

  /**
   * Emitted when logo is clicked
   */
  @Output() logoClicked = new EventEmitter<void>();

  /**
   * Emitted when download button is clicked
   */
  @Output() downloadClicked = new EventEmitter<void>();
}
