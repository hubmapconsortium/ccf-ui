import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ccf-tissues-browser-grid',
  templateUrl: './tissues-browser-grid.component.html',
  styleUrls: ['./tissues-browser-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TissuesBrowserGridComponent {
  static readonly defaultNumColumns = 6;

  @Input() items: any[]; // FIXME: Correct typings
  @Input() numColumns: number;

  get itemWidthPercentage(): string {
    const percentage = 100 / (this.numColumns || TissuesBrowserGridComponent.defaultNumColumns);
    const truncated = percentage.toFixed(3).slice(0, -1); // Truncate number to 2 decimal places without rounding.
    return truncated + '%';
  }
}
