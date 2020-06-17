import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DataSourceService } from '../../core/services/data-source/data-source.service';

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

  constructor(readonly dataSourceService: DataSourceService) {
  }

  /**
   * Current filter settings
   */
  @Input() filters: Record<string, unknown[] | unknown>;

  /**
   * Emitted when refresh button is clicked
   */
  @Output() refreshClicked = new EventEmitter<void>();

  /**
   * Emitted when download button is clicked
   */
  @Output() downloadClicked = new EventEmitter<void>();
}
