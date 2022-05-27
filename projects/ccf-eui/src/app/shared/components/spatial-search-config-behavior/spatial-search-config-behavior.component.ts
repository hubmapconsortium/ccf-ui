import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrganInfo } from 'ccf-shared';

import { SceneState } from '../../../core/store/scene/scene.state';
import { SpatialSearchConfigComponent } from '../spatial-search-config/spatial-search-config.component';


export type Sex = 'male' | 'female';

@Component({
  selector: 'ccf-spatial-search-config-behavior',
  templateUrl: './spatial-search-config-behavior.component.html',
  styleUrls: ['./spatial-search-config-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchConfigBehaviorComponent implements OnInit, OnChanges {

  @Input() organs: OrganInfo[];

  @Input() selectedOrgan?: OrganInfo;

  @Output() readonly sexChange = new EventEmitter<Sex>();

  @Output() readonly organChange = new EventEmitter<OrganInfo>();

  @Output() readonly itemSelected = new EventEmitter<{ sex: Sex; organ: OrganInfo }>();

  filteredOrgans: OrganInfo[];

  sex: Sex = 'male';

  constructor(readonly scene: SceneState, public dialogRef: MatDialogRef<SpatialSearchConfigComponent>) {
    this.scene.referenceOrgans$.subscribe((organs: OrganInfo[]) => {
      this.organs = organs;
    });
  }

  ngOnInit(): void {
    this.filterOrgans();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('organs' in changes) {
      this.filterOrgans();
    }
    if ('selectedOrgan' in changes && this.selectedOrgan && this.selectedOrgan.sex) {
      this.updateSex(this.selectedOrgan.sex);
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
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.filteredOrgans = this.organs.filter(organ => organ.hasSex || organ.sex === this.sex);
  }
}
