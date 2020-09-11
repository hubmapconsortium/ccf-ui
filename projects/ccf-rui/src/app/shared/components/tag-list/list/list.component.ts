import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { ColoredTag } from '../tag-list.types';



@Component({
  selector: 'ccf-tag-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-tag-list';

  @Input() items: ColoredTag[];

  @Output() readonly itemRemoved = new EventEmitter<ColoredTag>();
  @Output() readonly itemsChange = new EventEmitter<ColoredTag[]>();

  itemId(_index: number, item: ColoredTag): string {
    return item.tag;
  }

  removeItem(item: ColoredTag): void {
    this.items = this.items.filter(obj => obj !== item);
    this.itemRemoved.emit(item);
    this.itemsChange.emit(this.items);
  }
}
