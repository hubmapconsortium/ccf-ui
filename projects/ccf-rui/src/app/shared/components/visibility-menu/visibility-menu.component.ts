import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

/**
 * Interface for visibility item data
 */
export interface VisibilityItem {

  /**
   * Id of the item
   */
  id: number;

  /**
   * Name of the item
   */
  name: string;

  /**
   * Whether the item is currently highlighted
   */
  visible: boolean;

  /**
   * Src of the icon (visible or non-visible)
   */
  iconSrc: string;

  /**
   * Opacity value
   */
  opacity?: number;

  /**
   * Tooltip text to be displayed in the stage
   */
  tooltip?: string;
}

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
   * Whether opacity value should be displayed
   */
  @Input() opacityOn = false;

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
  @Output() opacityChange = new EventEmitter<number>();

  /**
   * Emits the currently hovered item
   */
  @Output() hover = new EventEmitter<VisibilityItem | undefined>();

  /**
   * Disables slider interactions
   */
  disableSlider = true;

  /**
   * Toggles highlight state, sets the icon type, and emits an array containing the currently visible items
   * @param item Menu item
   */
  toggleVisibility(item: VisibilityItem): void {
    item.visible = !item.visible;
    this.visibleItems = this.items.filter(x => x.visible);
    item.iconSrc = item.visible ? 'app:visibility_on' : 'app:visibility_off';
    this.visibleItemsChange.emit(this.visibleItems);
  }

  /**
   * Toggles selected status of an item on click and disables the slider if no item is selected
   * @param item Menu item
   */
  toggleSelected(item: VisibilityItem): void {
    this.selection = item === this.selection ? undefined : item;
    this.disableSlider = this.selection ? false : true;
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
    } else {
      this.selection.opacity = value;
    }
    this.opacityChange.emit(value);
  }

  /**
   * Resets all opacity values to 100;
   */
  resetOpacity(): void {
    for(const item of this.items) {
      item.opacity = 100;
    }
  }
}
