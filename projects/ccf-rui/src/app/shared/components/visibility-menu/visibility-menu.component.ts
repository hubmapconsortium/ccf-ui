import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { VisibilityItem } from '../../../core/models/visibility-item';

/**
 * Menu for displaying visibility options
 */
@Component({
  selector: 'ccf-visibility-menu',
  templateUrl: './visibility-menu.component.html',
  styleUrls: ['./visibility-menu.component.scss']
})
export class VisibilityMenuComponent {

  /**
   * HTML class name
   */
  @HostBinding('class') readonly clsName = 'ccf-visibility-menu';

  /**
   * Items to be displayed in the visibility menu
   */
  @Input() items: VisibilityItem[];

  /**
   * Items that are currently set to visible
   */
  @Input() visibleItems: VisibilityItem[];

  /**
   * The currently selected item
   */
  @Input() selection: VisibilityItem | undefined;

  /**
   * Emits the currently visible items
   */
  @Output() visibleItemsChange = new EventEmitter<VisibilityItem[]>();

  /**
   * Emits the currently selected item
   */
  @Output() selectionChange = new EventEmitter<VisibilityItem | undefined>();

  /**
   * Emits the current opacity value
   */
  @Output() opacityChange = new EventEmitter<VisibilityItem>();

  /**
   * Emits the currently hovered item
   */
  @Output() hover = new EventEmitter<VisibilityItem | undefined>();

  /**
   * Emits whenever there is a change to one or more items.
   */
  @Output() readonly itemsChange = new EventEmitter<VisibilityItem[]>();

  /**
   * Disables slider interactions
   */
  disableSlider = true;

  /**
   * Toggles highlight state, sets the icon type, and emits an array containing the currently visible items
   * Disables the slider if no item is visible
   * @param item Menu item
   */
  toggleVisibility(item: VisibilityItem): void {
    item = {...item, visible: !item.visible};
    if (this.selection && item.id === this.selection.id) {
      this.selection = {...this.selection, visible: item.visible};
    }
    this.items = this.items.map(x => x.id === item.id ? item : x);
    this.visibleItems = this.items.filter(x => x.visible);
    this.disableSlider = this.visibleItems.length > 0 ? false : true;
    this.visibleItemsChange.emit(this.visibleItems);
    this.itemsChange.emit(this.items);
  }

  /**
   * Toggles selected status of an item on click
   * @param item Menu item
   */
  toggleSelected(item: VisibilityItem): void {
    this.selection = item === this.selection ? undefined : item;
    this.selectionChange.emit(item);
  }

  /**
   * Emits an item in response to hover action
   * @param item Menu item
   */
  mouseOver(item: VisibilityItem): void {
    this.hover.emit(item);
  }

  /**
   * Emits undefined in response to mouse out
   * @param item Menu item
   */
  mouseOut(item: VisibilityItem): void {
    this.hover.emit(undefined);
  }

  /**
   * Updates opacity of the currently selected item (if selected) and emits the new opacity value
   * @param value Updated opacity value
   */
  updateOpacity(value: number): void {
    if (!this.selection) {
      return;
    }
    const updatedSelection = {...this.selection, opacity: value};
    this.selection = updatedSelection;
    this.items = this.items.map(x => x.id === updatedSelection.id ? updatedSelection : x);
    this.opacityChange.emit(updatedSelection);
    this.itemsChange.emit(this.items);
  }

  /**
   * Resets all item opacity values and current selected item opacity to 100;
   */
  resetOpacity(): void {
    this.items = this.items.map(i => ({ ...i, opacity: 100}));
    this.updateOpacity(100);
  }

  /**
   * Returns the id of an item
   * @param index Index of item in items array
   * @param item The item to get an id for
   * @returns id Id of the item
   */
  getId(_index: number, item: VisibilityItem): number {
    return item.id;
  }

  /**
   * Determines if opacity value of the item is hidden (when opacity = 100)
   * @param item Item of interest
   * @returns true if hidden
   */
  isHidden(item: VisibilityItem): boolean {
    return item.opacity === 100 ? true : false;
  }
}
