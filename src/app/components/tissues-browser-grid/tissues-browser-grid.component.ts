import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { OntologyNode } from '../../shared/state/ontology/ontology.model';

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
  @Input() items: OntologyNode[];

  /**
   * Desired number of columns in the grid.
   */
  @Input() numColumns: number;

  /**
   * Width of each individual grid item as a percentage formatted string.
   */
  itemWidthPercentage: string;

  /**
   * Item currently being hovered.
   */
  activePopoverItem: OntologyNode;

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
   * Sets the active popover item.
   *
   * @param item The item object.
   */
  setActivePopoverItem(item: OntologyNode): void {
    this.activePopoverItem = item;
  }

  /**
   * Clears the active popover item.
   */
  clearActivePopoverItem(): void {
    this.activePopoverItem = undefined;
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
