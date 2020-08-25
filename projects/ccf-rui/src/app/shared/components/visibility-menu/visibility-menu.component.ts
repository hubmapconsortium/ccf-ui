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
   * Whether the item is currently active
   */
  selected: boolean;

  /**
   * Whether the item is currently highlighted
   */
  highlighted: boolean;

  /**
   * Src of the icon (visible or non-visible)
   */
  iconSrc: string;
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
  @Output() valueChange = new EventEmitter<string[]>();

  /**
   * Sets the icon type and emits an array containing the currently highlighted items
   * @param item Visibility item
   */
  toggleHighlight(item: VisibilityItem): void {
    item.iconSrc = item.highlighted ? 'app:visibility_on' : 'app:visibility_off';
    this.valueChange.emit(this.visibilityItems.filter(x => x.highlighted).map(entry => entry.name));
  }

  /**
   * Sets highlight status of an item (on mouseout or click)
   * Sets icon and emits currently highlighted items
   * @param item Visibility item
   */
  setHighlight(item: VisibilityItem): void {
    item.highlighted = item.selected ? true : false;
    this.toggleHighlight(item);
  }

  /**
   * Toggles selected status of an item on click and sets highlight status of the item
   * @param item Visibility item
   */
  toggleSelected(item: VisibilityItem): void {
    item.selected = !item.selected;
    this.setHighlight(item);
  }

  /**
   * Highlights the item on hover
   * Sets icon and emits currently highlighted items
   * @param item Visibility item
   */
  hover(item: VisibilityItem): void {
    item.highlighted = true;
    this.toggleHighlight(item);
  }
}
