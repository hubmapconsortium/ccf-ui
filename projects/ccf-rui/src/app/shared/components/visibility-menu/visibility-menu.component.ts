import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

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
   * Emits the currently hovered item
   */
  @Output() hover = new EventEmitter<VisibilityItem | undefined>();

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
   * Toggles selected status of an item on click and sets visibility status of the item
   * @param item Menu item
   */
  toggleSelected(item: VisibilityItem): void {
    this.selection = item === this.selection ? undefined : item;
    // this.opacity = this.selection ? this.selection.opacity : undefined;
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

  updateOpacity(value: number): void {
    if (!this.selection) {
      return;
    } else {
      this.selection.opacity = value;
    }
  }
}
