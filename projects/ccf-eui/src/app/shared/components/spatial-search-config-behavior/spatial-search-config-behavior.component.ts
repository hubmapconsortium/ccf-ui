import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { GlobalConfigState, InfoButtonService, InfoDialogComponent, OrganInfo, PanelData } from 'ccf-shared';
import { Observable, Subscription } from 'rxjs';

import { actionAsFn } from '../../../core/store/action-as-fn';
import { SetOrgan, SetSex } from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchUiSelectors } from '../../../core/store/spatial-search-ui/spatial-search-ui.selectors';
import { Sex, SpatialSearchConfigComponent } from '../spatial-search-config/spatial-search-config.component';
import { SpatialSearchUiBehaviorComponent } from '../spatial-search-ui-behavior/spatial-search-ui-behavior.component';
import { AppOptions } from 'ccf-api';


@Component({
  selector: 'ccf-spatial-search-config-behavior',
  templateUrl: './spatial-search-config-behavior.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchConfigBehaviorComponent implements OnDestroy {
  @Select(SpatialSearchUiSelectors.sex)
  readonly sex$: Observable<Sex>;

  @Select(SpatialSearchUiSelectors.organ)
  readonly selectedOrgan$: Observable<OrganInfo | undefined>;

  @Select(SpatialSearchUiSelectors.organs)
  readonly organs$: Observable<OrganInfo[]>;

  @Dispatch()
  readonly updateSex = actionAsFn(SetSex);

  @Dispatch()
  readonly updateOrgan = actionAsFn(SetOrgan);

  panelData: PanelData;

  baseHref = '';

  private readonly subscriptions = new Subscription();

  private readonly dialogSubs = new Subscription();

  constructor(
    public dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<SpatialSearchConfigComponent>,
    private readonly spatialSearchDialog: MatDialog,
    private readonly infoService: InfoButtonService,
    private readonly globalConfig: GlobalConfigState<AppOptions>
  ) {
    this.globalConfig.getOption('baseHref').subscribe((ref: string) => {
      this.baseHref = ref;
    });
  }

  buttonClicked(): void {
    this.spatialSearchDialog.open(SpatialSearchUiBehaviorComponent);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  launchInfoDialog(data: PanelData): void {
    this.dialogSubs.unsubscribe();
    this.dialog.open(InfoDialogComponent, {
      autoFocus: false,
      panelClass: 'modal-animated',
      width: '72rem',
      data: {
        title: data.infoTitle,
        content: data.content,
        videoID: data.videoID
      }
    });
  }

  onDialogButtonClick(): void {
    this.infoService.updateData(this.baseHref + 'assets/docs/SPATIAL_SEARCH_README.md', 'UfxMpzatowE', 'Spatial Search');
    const panelContent$ = this.infoService.panelContent.asObservable();
    this.dialogSubs.add(panelContent$.subscribe(data => {
      if (data.content.length) {
        this.panelData = data;
        this.launchInfoDialog(this.panelData);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
