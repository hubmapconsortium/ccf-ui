import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


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
