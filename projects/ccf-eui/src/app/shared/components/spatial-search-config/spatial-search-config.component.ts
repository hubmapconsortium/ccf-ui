import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrganInfo } from 'ccf-shared';


export type Sex = 'male' | 'female';

@Component({
  selector: 'ccf-spatial-search-config',
  templateUrl: './spatial-search-config.component.html',
  styleUrls: ['./spatial-search-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchConfigComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-config';

  @Input() organs: OrganInfo[] = [];

  @Input() selectedOrgan?: OrganInfo;

  @Output() readonly updateSex = new EventEmitter<Sex>();

  @Output() readonly updateOrgan = new EventEmitter<OrganInfo>();

  @Output() readonly buttonClicked = new EventEmitter();

  @Output() readonly closeDialog = new EventEmitter();

  sex: Sex = 'male';

  constructor() { }
}
