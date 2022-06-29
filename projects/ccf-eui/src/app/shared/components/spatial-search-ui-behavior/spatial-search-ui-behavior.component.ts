import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { InfoButtonService, InfoDialogComponent, OrganInfo, PanelData } from 'ccf-shared';
import { Observable, Subscription } from 'rxjs';

import { actionAsFn } from '../../../core/store/action-as-fn';
import { SetPosition, SetRadius, ResetRadius, ResetPosition } from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchUiSelectors } from '../../../core/store/spatial-search-ui/spatial-search-ui.selectors';
import { Position, RadiusSettings } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { SpatialSearchConfigBehaviorComponent } from '../spatial-search-config-behavior/spatial-search-config-behavior.component';
import { Sex } from '../spatial-search-config/spatial-search-config.component';
import { SpatialSearchUiComponent } from '../spatial-search-ui/spatial-search-ui.component';


@Component({
  selector: 'ccf-spatial-search-ui-behavior',
  templateUrl: './spatial-search-ui-behavior.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpatialSearchUiBehaviorComponent {

  @Select(SpatialSearchUiSelectors.sex)
  readonly sex$: Observable<Sex>;

  @Select(SpatialSearchUiSelectors.organ)
  readonly organ$: Observable<OrganInfo | undefined>;

  @Select(SpatialSearchUiSelectors.position)
  readonly position$: Observable<Position>;

  @Select(SpatialSearchUiSelectors.defaultPosition)
  readonly defaultPosition$: Observable<Position>;

  @Select(SpatialSearchUiSelectors.radius)
  readonly radius$: Observable<number>;

  @Select(SpatialSearchUiSelectors.radiusSettings)
  readonly radiusSettings$: Observable<RadiusSettings>;

  @Dispatch()
  readonly updatePosition = actionAsFn(SetPosition);

  @Dispatch()
  readonly resetPosition = actionAsFn(ResetPosition);

  @Dispatch()
  readonly updateRadius = actionAsFn(SetRadius);

  @Dispatch()
  readonly resetRadius = actionAsFn(ResetRadius);

  panelData: PanelData;

  private readonly dialogSubs = new Subscription();

  constructor(
    private readonly dialogRef: MatDialogRef<SpatialSearchUiComponent>,
    public dialog: MatDialog,
    private readonly infoService: InfoButtonService
  ) { }

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

  close(): void {
    this.dialogRef.close();
  }

  addSpatialSearch(): void {
    //add to spatial search list
    this.close();
  }

  openSpatialSearchConfig(): void {
    this.close();
    this.dialog.open(SpatialSearchConfigBehaviorComponent);
  }
}
