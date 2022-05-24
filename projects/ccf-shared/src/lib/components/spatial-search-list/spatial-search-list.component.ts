import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';


@Component({
  selector: 'ccf-spatial-search-list',
  templateUrl: './spatial-search-list.component.html',
  styleUrls: ['./spatial-search-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchListComponent {
  /** HTML class */
  @HostBinding('class') readonly clsName = 'ccf-spatial-search-list';

  @Input() label: string;

  @Input() items: unknown[]; // TODO correct type

  @Output() readonly itemSelected = new EventEmitter<unknown>(); // TODO correct type

  @Output() readonly itemRemoved = new EventEmitter<unknown>(); // TODO correct type

  // TODO
}
