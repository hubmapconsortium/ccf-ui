import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { OpacitySliderComponent } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { VisibilityItem } from '../../../core/models/visibility-item';


/**
 * Menu for displaying visibility options
 */
@Component({
  selector: 'ccf-visibility-menu',
  templateUrl: './visibility-menu.component.html',
  styleUrls: ['./visibility-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
   * The currently selected item
   */
  @Input() selection: VisibilityItem | undefined;

  /**
   * Emits the currently hovered item
   */
  @Output() readonly hover = new EventEmitter<VisibilityItem | undefined>();

  /**
   * Emits whenever there is a change to one or more items.
   */
  @Output() readonly itemsChange = new EventEmitter<VisibilityItem[]>();

  /**
   * slider component
   */
  @ViewChild('slider', { static: false }) slider: OpacitySliderComponent;

  /**
   * Creates an instance of visibility menu component.
   *
   * @param el document element
   * @param ga Analytics service
   */
  constructor(el: ElementRef<Element>, private readonly ga: GoogleAnalyticsService) {
    el.nativeElement.addEventListener('mousedown', () => {
      const input = el.nativeElement.querySelector('.visible .opacity-slider');
      if (input) {
        input.addEventListener('input', (event: InputEvent) => {
          const target = event.target as HTMLInputElement;
          this.slider.changeOpacity(target.value);
        });
      }
    });
  }

  /**
   * Toggles visibility of an item; opacity is reverted to the previous value if visibility toggled back on
   *
   * @param item Menu item
   */
  toggleVisibility(item: VisibilityItem): void {
    item = { ...item, visible: !item.visible };
    if (this.selection && item.id === this.selection.id) {
      this.selection = { ...this.selection, visible: item.visible };
    }

    this.ga.event('visibility_toggled', 'visibility_menu', '' + item.id, +item.visible);
    this.updateOpacity(item.opacity);
  }

  /**
   * Changes current selection to hovered over item and emits the item
   *
   * @param item Menu item
   */
  mouseOver(item: VisibilityItem): void {
    this.selection = item === this.selection ? undefined : item;
    this.hover.emit(item);
  }

  /**
   * Clears current selection and emits undefined in response to mouse out
   *
   * @param item Menu item
   */
  mouseOut(): void {
    this.selection = undefined;
    this.hover.emit(undefined);
  }

  /**
   * Updates opacity of the currently selected item (if one is selected) and emits the new items
   *
   * @param value Updated opacity value
   */
  updateOpacity(value: number | undefined): void {
    if (!this.selection) {
      return;
    }
    const updatedSelection = { ...this.selection, opacity: value };
    this.selection = updatedSelection;
    if (updatedSelection.id === 'all') {
      this.setAllOpacity(updatedSelection.opacity as number);
    } else {
      this.items = this.items.map(item => item.id === updatedSelection.id ? updatedSelection : item);
      this.ga.event('opacity_update', 'visibility_menu', '' + updatedSelection.id, updatedSelection.opacity);
    }
    this.itemsChange.emit(this.items);
  }

  /**
   * Resets item to opacity 20 and visible
   */
  resetItem(): void {
    if (this.selection) {
      const updatedSelection = { ...this.selection, opacity: 20, visible: true };
      this.selection = updatedSelection;
      if (this.selection.id === 'all') {
        this.setAllOpacity(updatedSelection.opacity);
      } else {
        this.items = this.items.map(item => item.id === updatedSelection.id ? updatedSelection : item);
        this.ga.event('item_reset', 'visibility_menu', '' + updatedSelection.id);
      }
      this.itemsChange.emit(this.items);
    }
  }

  /**
   * Sets all items to the same opacity and makes them visible
   *
   * @param value Updated opacity value
   */
  setAllOpacity(value: number): void {
    this.items = this.items.map(i => ({ ...i, opacity: value, visible: true }));
    this.ga.event('all_items_opacity_update', 'visibility_menu', undefined, value);
    this.itemsChange.emit(this.items);
  }

  /**
   * Returns the id of an item
   *
   * @param index Index of item in items array
   * @param item The item to get an id for
   * @returns id Id of the item
   */
  getId(_index: number, item: VisibilityItem): string | number {
    return item.id;
  }
}
