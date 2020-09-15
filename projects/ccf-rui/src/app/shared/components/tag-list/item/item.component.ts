import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { ColoredTag } from '../tag-list.types';


@Component({
  selector: 'ccf-tag-list-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListItemComponent {
  /** HTML class name */
  @HostBinding('class') readonly clsName = 'ccf-tag-list-item';

  @Input() item: ColoredTag;

  @Output() readonly removed = new EventEmitter<void>();

  // tslint:disable-next-line: no-unsafe-any
  @HostBinding('style.color')
  get textColor(): string | null {
    return this.item.color ?? null;
  }
}
