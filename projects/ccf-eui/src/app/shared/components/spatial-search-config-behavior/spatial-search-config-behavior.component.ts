import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { InfoDialogComponent, OrganInfo, InfoButtonService, PanelData } from 'ccf-shared';
import { Observable, Subscription } from 'rxjs';

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
export class SpatialSearchConfigBehaviorComponent implements OnDestroy {
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

  sex: Sex;

  organ?: OrganInfo;

  panelData: PanelData;

  private readonly subscriptions = new Subscription();

  private readonly dialogSubs = new Subscription();

  constructor(
    private readonly dialogRef: MatDialogRef<SpatialSearchConfigComponent>,
    private readonly spatialSearchDialog: MatDialog,
    public dialog: MatDialog,
    private readonly infoService: InfoButtonService,

  ) {
    this.subscriptions.add(this.sex$.subscribe((sex) => {
      this.sex = sex;
    }));
    this.subscriptions.add(this.selectedOrgan$.subscribe((organ) => {
      this.organ = organ;
    }));
  }

  buttonClicked(): void {
    this.spatialSearchDialog.open(SpatialSearchUiBehaviorComponent, {
      data: {
        sex: this.sex,
        organ: this.organ,
        spatialSearch: {
          x: 0, //need the right starting coordinates
          y: 0,
          z: 0,
          radius: 5,
          target: this.organ?.id
        },
        sliderSettings: [5, 50]
      }
    });
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
    this.infoService.updateData('assets/docs/SPATIAL_SEARCH_README.md', 'N2JUogY-DQw', 'Spatial Search');
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
