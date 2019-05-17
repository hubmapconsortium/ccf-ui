import { Component, Input } from '@angular/core';

import { TissueImage } from '../../shared/state/database/database.models';

/**
 * A grid where each item can be hovered to display a popover.
 */
@Component({
  selector: 'ccf-tissues-browser-grid',
  templateUrl: './tissues-browser-grid.component.html',
  styleUrls: ['./tissues-browser-grid.component.scss']
})
export class TissuesBrowserGridComponent {
  /**
   * Default number of columns in the tissues browser grid.
   */
  static readonly defaultNumColumns = 6;

  /**
   * Grid items.
   */
  @Input() items: TissueImage[];

  /**
   * Desired number of columns in the grid.
   */
  @Input() numColumns: number;

  /**
   * Item currently being hovered.
   */
  activePopoverItem: TissueImage;

  /**
   * Sets the active popover item.
   *
   * @param item The item object.
   */
  setActivePopoverItem(item: TissueImage): void {
    this.activePopoverItem = item;
  }

  /**
   * Clears the active popover item.
   */
  clearActivePopoverItem(): void {
    this.activePopoverItem = undefined;
  }
}
