import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ALL_POSSIBLE_ORGANS, OrganInfo } from 'ccf-shared';


export type Sex = 'male' | 'female';

@Component({
  selector: 'ccf-spatial-search-config',
  templateUrl: './spatial-search-config.component.html',
  styleUrls: ['./spatial-search-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchConfigComponent {
  @HostBinding('class') readonly className = 'ccf-spatial-search-config';

  @Input() allOrgans: OrganInfo[] = ALL_POSSIBLE_ORGANS;

  @Input() selectedOrgan?: OrganInfo;

  @Output() sexChange = new EventEmitter<Sex>();

  @Output() organChange = new EventEmitter<OrganInfo>();

  @Output() itemSelected = new EventEmitter<{ sex: Sex; organ: OrganInfo | undefined }>();

  filteredOrgans: OrganInfo[];

  sex: Sex = 'male';

  constructor(public dialogRef: MatDialogRef<SpatialSearchConfigComponent>) {
    this.filterOrgans();
  }

  updateSex(sex: Sex) {
    this.sex = sex;
    this.filterOrgans();
    this.sexChange.emit(this.sex);
  }

  updateOrgan(organ: OrganInfo) {
    this.selectedOrgan = organ;
    this.organChange.emit(this.selectedOrgan);
  }

  buttonClicked(): void {
    this.itemSelected.emit({ sex: this.sex, organ: this.selectedOrgan });
  }

  close() {
    document.getElementsByClassName('modal-animated')[0]?.classList.add('modal-animate-fade-out');
    setTimeout(() => {
      this.dialogRef.close();
    }, 250);
  }

  filterOrgans(): void {
    this.filteredOrgans = this.allOrgans.filter(organ => organ.hasSex ?? organ.sex === this.sex);
  }
}
