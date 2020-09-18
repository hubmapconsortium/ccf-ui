import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { ColoredTag } from '../tag-list.types';


/**
 * A single item in a tag list
 */
@Component({
  selector: 'ccf-tag-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListItemComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-tag-list-item';

  /**
   * The item to display
   */
  @Input() item: ColoredTag;

  /**
   * Emits when the remove button is pressed
   */
  @Output() readonly removed = new EventEmitter<void>();

  /**
   * The color of the text or null if default
   */
  // tslint:disable-next-line: no-unsafe-any
  @HostBinding('style.color')
  get textColor(): string | null {
    return this.item.color ?? null;
  }
}
