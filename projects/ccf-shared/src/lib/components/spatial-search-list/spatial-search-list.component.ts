import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';


export interface SpatialSearchListItem {
  selected: boolean;
  description: string;
}


@Component({
  selector: 'ccf-spatial-search-list',
  templateUrl: './spatial-search-list.component.html',
  styleUrls: ['./spatial-search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchListComponent<T extends SpatialSearchListItem> {
  /** HTML class */
  @HostBinding('class') readonly clsName = 'ccf-spatial-search-list';

  @Input() label: string;

  @Input() items: T[];

  @Output() readonly selectionChanged = new EventEmitter<T[]>();

  @Output() readonly itemRemoved = new EventEmitter<T>();

  itemId(_index: number, item: T): string {
    return item.description;
  }

  updateItemSelection(index: number, selected: boolean): void {
    const newItems = this.items = [...this.items];
    newItems[index] = { ...newItems[index], selected };

    const selectedItems = newItems.filter(item => item.selected);
    this.selectionChanged.emit(selectedItems);
  }

  removeItem(index: number): void {
    const newItems = this.items = [...this.items];
    const [item] = newItems.splice(index, 1);
    this.itemRemoved.emit(item);
  }
}
