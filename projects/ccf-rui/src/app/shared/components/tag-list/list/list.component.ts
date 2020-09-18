import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { ColoredTag } from '../tag-list.types';


/**
 * A list of removable tags
 */
@Component({
  selector: 'ccf-tag-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-tag-list';

  /**
   * The tag items
   */
  @Input() items: ColoredTag[];

  /**
   * Emits when a tag item is removed
   */
  @Output() readonly itemRemoved = new EventEmitter<ColoredTag>();

  /**
   * Emits the new array of items when an item has been removed
   */
  @Output() readonly itemsChange = new EventEmitter<ColoredTag[]>();

  /**
   * Gets the unique identifier for an item
   *
   * @param _index Unused
   * @param item An item
   * @returns An identifier
   */
  itemId(_index: number, item: ColoredTag): string {
    return item.tag;
  }

  /**
   * Removes an item from the list
   *
   * @param item Item to remove
   */
  removeItem(item: ColoredTag): void {
    this.items = this.items.filter(obj => obj !== item);
    this.itemRemoved.emit(item);
    this.itemsChange.emit(this.items);
  }
}
