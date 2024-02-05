import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * Header which is always displayed on the site; contains current filter info,
 * a link to download data, and a logo which resets the page when clicked.
 */
@Component({
  selector: 'ccf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  /**
   * URL to Portal site
   */
  @Input() homeUrl!: string;

  @Input() loginDisabled!: boolean;

  @Input() logoTooltip!: string;

  /**
   * Is the user logged in?
   */
  @Input() loggedIn!: boolean;

  /**
   * Current filter settings
   */
  @Input() filters!: Record<string, unknown[] | unknown>;

  @Input() baseRef = '';

  /**
   * Emitted when refresh button is clicked
   */
  @Output() readonly refreshClicked = new EventEmitter<void>();

  /**
   * Emitted when download button is clicked
   */
  @Output() readonly downloadClicked = new EventEmitter<void>();

  ngOnInit() {
    const theme = document.getElementsByTagName('ccf-root')[0].classList[0];
    const logo = document.getElementsByClassName('logo')[0] as HTMLElement;
    if (['hubmap-theme-dark', 'hubmap-theme-light'].includes(theme)) {
      logo.style.backgroundImage = `url(${this.baseRef}assets/icons/app/hubmap-logo.svg)`;
    } else if (['sennet-theme-dark', 'sennet-theme-light'].includes(theme)) {
      logo.style.backgroundImage = `url(${this.baseRef}assets/icons/app/sennet-logo.svg)`;
    } else if (['gtex-theme-dark', 'gtex-theme-light'].includes(theme)) {
      logo.style.backgroundImage = `url(${this.baseRef}assets/icons/app/gtex-logo.png)`;
    } else {
      logo.style.backgroundImage = `url(${this.baseRef}assets/icons/app/default-logo.svg)`;
    }
  }
}
