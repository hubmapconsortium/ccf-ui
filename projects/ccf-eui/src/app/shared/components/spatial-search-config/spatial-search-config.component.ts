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
import { ALL_POSSIBLE_ORGANS, OrganInfo } from 'ccf-shared';


export type Sex = 'male' | 'female';

@Component({
  selector: 'ccf-spatial-search-config',
  templateUrl: './spatial-search-config.component.html',
  styleUrls: ['./spatial-search-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchConfigComponent implements OnChanges, OnInit {
  @HostBinding('class') readonly className = 'ccf-spatial-search-config';

  @Input() organs: OrganInfo[] = ALL_POSSIBLE_ORGANS;

  @Input() selectedOrgan?: OrganInfo;

  @Output() readonly sexChange = new EventEmitter<Sex>();

  @Output() readonly organChange = new EventEmitter<OrganInfo>();

  @Output() readonly itemSelected = new EventEmitter<{ sex: Sex; organ: OrganInfo }>();

  filteredOrgans: OrganInfo[];

  sex: Sex = 'male';

  constructor(public dialogRef: MatDialogRef<SpatialSearchConfigComponent>) { }

  ngOnInit(): void {
    this.filterOrgans();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('organs' in changes) {
      this.filterOrgans();
    }
    if ('selectedOrgan' in changes) {
      if (this.selectedOrgan && this.selectedOrgan.sex) {
        this.updateSex(this.selectedOrgan.sex);
      }
    }
  }

  updateSex(sex: Sex): void {
    this.sex = sex;
    this.filterOrgans();
    this.sexChange.emit(this.sex);
  }

  updateOrgan(organ: OrganInfo): void {
    this.selectedOrgan = organ;
    this.organChange.emit(this.selectedOrgan);
  }

  buttonClicked(): void {
    if (this.selectedOrgan) {
      this.itemSelected.emit({ sex: this.sex, organ: this.selectedOrgan });
    }
  }

  close(): void {
    document.getElementsByClassName('modal-animated')[0]?.classList.add('modal-animate-fade-out');
    setTimeout(() => {
      this.dialogRef.close();
    }, 250);
  }

  filterOrgans(): void {
    this.filteredOrgans = this.organs.filter(organ => organ.hasSex || organ.sex === this.sex);
  }
}
