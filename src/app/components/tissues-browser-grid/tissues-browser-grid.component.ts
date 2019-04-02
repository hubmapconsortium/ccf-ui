import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

/**
 * A grid where each item can be hovered to display a popover.
 */
@Component({
  selector: 'ccf-tissues-browser-grid',
  templateUrl: './tissues-browser-grid.component.html',
  styleUrls: ['./tissues-browser-grid.component.scss']
})
export class TissuesBrowserGridComponent implements OnInit, OnChanges {
  /**
   * Default number of columns in the tissues browser grid.
   */
  static readonly defaultNumColumns = 6;

  /**
   * Grid items.
   */
  @Input() items: any[]; // FIXME: Correct typings

  /**
   * Desired number of columns in the grid.
   */
  @Input() numColumns: number;

  /**
   * Width of each individual grid item as a percentage formatted string.
   */
  itemWidthPercentage: string;

  /**
   * Angular's OnInit hook.
   */
  ngOnInit() {
    this.updateItemWidth();
  }

  /**
   * Angular's OnChanges hook.
   *
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('numColumns' in changes) { this.updateItemWidth(); }
  }

  /**
   * Updates the individual grid item widths.
   */
  private updateItemWidth(): void {
    const percentage = 100 / (this.numColumns || TissuesBrowserGridComponent.defaultNumColumns);
    const truncated = percentage.toFixed(3).slice(0, -1); // Truncate number to 2 decimal places without rounding.
    this.itemWidthPercentage = truncated + '%';
  }
}
