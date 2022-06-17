import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { OrganInfo } from 'ccf-shared';
import { Observable } from 'rxjs';

import { actionAsFn } from '../../../core/store/action-as-fn';
import { SetOrgan, SetSex } from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchUiSelectors } from '../../../core/store/spatial-search-ui/spatial-search-ui.selectors';
import { Sex, SpatialSearchConfigComponent } from '../spatial-search-config/spatial-search-config.component';
import { SpatialSearchUiBehaviorComponent } from '../spatial-search-ui-behavior/spatial-search-ui-behavior.component';



@Component({
  selector: 'ccf-spatial-search-config-behavior',
  templateUrl: './spatial-search-config-behavior.component.html',
  styleUrls: ['./spatial-search-config-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchConfigBehaviorComponent {
  @Select(SpatialSearchUiSelectors.sex)
  readonly sex$: Observable<Sex>;

  @Select(SpatialSearchUiSelectors.organs)
  readonly organs$: Observable<OrganInfo[]>;

  @Select(SpatialSearchUiSelectors.organ)
  readonly selectedOrgan$: Observable<OrganInfo | undefined>;

  @Dispatch()
  readonly updateSex = actionAsFn(SetSex);

  @Dispatch()
  readonly updateOrgan = actionAsFn(SetOrgan);

  constructor(
    private readonly dialogRef: MatDialogRef<SpatialSearchConfigComponent>,
    private readonly spatialSearchDialog: MatDialog
  ) { }

  buttonClicked(): void {
    this.spatialSearchDialog.open(SpatialSearchUiBehaviorComponent);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
