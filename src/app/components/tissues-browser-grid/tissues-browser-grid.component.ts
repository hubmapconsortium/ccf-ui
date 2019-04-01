import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ccf-tissues-browser-grid',
  templateUrl: './tissues-browser-grid.component.html',
  styleUrls: ['./tissues-browser-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TissuesBrowserGridComponent implements OnInit, OnChanges {
  static readonly defaultNumColumns = 6;

  @Input() items: any[]; // FIXME: Correct typings
  @Input() numColumns: number;

  itemWidthPercentage: string;

  ngOnInit() {
    this.updateItemWidth();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('numColumns' in changes) { this.updateItemWidth(); }
  }

  private updateItemWidth(): void {
    const percentage = 100 / (this.numColumns || TissuesBrowserGridComponent.defaultNumColumns);
    const truncated = percentage.toFixed(3).slice(0, -1); // Truncate number to 2 decimal places without rounding.
    this.itemWidthPercentage = truncated + '%';
  }
}
