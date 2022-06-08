import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OrganInfo } from 'ccf-shared';
import { Subscription } from 'rxjs/internal/Subscription';

import { SceneState } from '../../../core/store/scene/scene.state';
import { Sex, SpatialSearchConfigComponent } from '../spatial-search-config/spatial-search-config.component';


@Component({
  selector: 'ccf-spatial-search-config-behavior',
  templateUrl: './spatial-search-config-behavior.component.html',
  styleUrls: ['./spatial-search-config-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchConfigBehaviorComponent implements OnDestroy {

  organs: OrganInfo[];

  selectedOrgan?: OrganInfo;

  sex: Sex = 'male';

  readonly sexChange = new EventEmitter<Sex>();

  readonly organChange = new EventEmitter<OrganInfo>();

  readonly itemSelected = new EventEmitter<{ sex: Sex; organ: OrganInfo }>();

  filteredOrgans: OrganInfo[];

  private readonly subscriptions = new Subscription();

  constructor(
    cdr: ChangeDetectorRef,
    scene: SceneState,
    private readonly dialogRef: MatDialogRef<SpatialSearchConfigComponent>
  ) {
    const sub = scene.referenceOrgans$.subscribe((organs: OrganInfo[]) => {
      this.organs = organs;
      this.filterOrgans();
      cdr.markForCheck();
    });

    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateSex(sex: Sex): void {
    this.sex = sex;
    this.filterOrgans();
    this.sexChange.emit(this.sex);
  }

  updateOrgan(organ?: OrganInfo): void {
    this.selectedOrgan = organ;
    this.organChange.emit(this.selectedOrgan);
  }

  buttonClicked(): void {
    if (this.selectedOrgan) {
      this.itemSelected.emit({ sex: this.sex, organ: this.selectedOrgan });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  filterOrgans(): void {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.filteredOrgans = this.organs.filter(organ => organ.hasSex || organ.sex === this.sex);
    if (this.selectedOrgan && !this.filteredOrgans.includes(this.selectedOrgan)) {
      this.updateOrgan(undefined);
    }
  }
}
