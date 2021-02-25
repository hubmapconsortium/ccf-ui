import { Component, EventEmitter, HostBinding, Input, Output, OnInit } from '@angular/core';
import { VisibilityItem } from '../../../core/models/visibility-item';

/**
 * Menu for displaying visibility options
 */
@Component({
  selector: 'ccf-visibility-menu',
  templateUrl: './visibility-menu.component.html',
  styleUrls: ['./visibility-menu.component.scss']
})
export class VisibilityMenuComponent implements OnInit {

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
   * Previous opacity value of the currently selected item
   */
  prevOpacities: (number | undefined)[];

  ngOnInit() {
    this.prevOpacities = this.items.map(i => 0);
  }

  /**
   * Toggles highlight state, sets the icon type, and emits an array containing the currently visible items
   * Disables the slider if a visible item is not selected
   * @param item Menu item
   */
  toggleVisibility(item: VisibilityItem): void {
    const index = this.items.indexOf(item);
    item = {...item, visible: !item.visible};
    if (this.selection && item.id === this.selection.id) {
      this.selection = {...this.selection, visible: item.visible};
      this.disableSlider = this.selection ? !this.selection.visible : true;
    }
    if (!item.visible) {
      this.updateOpacity(0);
      this.prevOpacities[index] = item.opacity;
    } else {
      this.updateOpacity(this.prevOpacities[index]);
      this.prevOpacities[index] = 0;
    }
  }

  /**
   * Emits an item in response to hover action
   * @param item Menu item
   */
  mouseOver(item: VisibilityItem): void {
    this.selection = item === this.selection ? undefined : item;
    this.disableSlider = this.selection ? !this.selection.visible : true;
  }

  /**
   * Emits undefined in response to mouse out
   * @param item Menu item
   */
  mouseOut(): void {
    this.selection = undefined;
    this.hover.emit(undefined);
  }

  /**
   * Updates opacity of the currently selected item (if selected) and emits the new opacity value
   * @param event [Updated opacity value, old opacity value]
   */
  updateOpacity(value: number | undefined): void {
    if (!this.selection) {
      return;
    }
    const updatedSelection = {...this.selection, opacity: value};
    this.selection = updatedSelection;
    this.items = this.items.map(x => x.id === updatedSelection.id ? updatedSelection : x);
    this.opacityChange.emit(updatedSelection);
    this.itemsChange.emit(this.items);
  }

  setAllOpacity(value: number): void {
    this.items = this.items.map(i => ({ ...i, opacity: value, visible: true}));
    this.itemsChange.emit(this.items);
  }

  /**
   * Returns the id of an item
   * @param index Index of item in items array
   * @param item The item to get an id for
   * @returns id Id of the item
   */
  getId(_index: number, item: VisibilityItem): string | number {
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
