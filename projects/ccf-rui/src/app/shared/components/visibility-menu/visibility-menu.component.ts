import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

/**
 * Interface for visibility item data
 */
export interface VisibilityItem {

  /**
   * Name of the item
   */
  name: string;

  /**
   * Whether the item is currently highlighted
   */
  highlighted: boolean;

  /**
   * Src of the icon (visible or non-visible)
   */
  iconSrc: string;

  /**
   * Opacity value
   */
  opacity?: number;
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
  @Input() visibilityItems: VisibilityItem[];

  /**
   * Emits the currently highlighted items
   */
  @Output() highlightChange = new EventEmitter<VisibilityItem[]>();

  /**
   * Emits the currently selected item
   */
  @Output() selectionChange = new EventEmitter<VisibilityItem>();

  /**
   * Whether opacity value should be displayed
   */
  @Input() opacityOn = false;

  selectedItem: VisibilityItem;

  /**
   * Toggles highlight state, sets the icon type, and emits an array containing the currently highlighted items
   * @param item Visibility item
   */
  toggleHighlight(item: VisibilityItem): void {
    item.highlighted = !item.highlighted;
    item.iconSrc = item.highlighted ? 'app:visibility_on' : 'app:visibility_off';
    this.highlightChange.emit(this.visibilityItems.filter(x => x.highlighted));
  }

  /**
   * Toggles selected status of an item on click and sets highlight status of the item
   * @param item Visibility item
   */
  toggleSelected(item: VisibilityItem): void {
    this.selectedItem = item;
    this.selectionChange.emit(item);
  }
}
