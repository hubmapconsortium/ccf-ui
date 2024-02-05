import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { SpatialSceneNode, TissueBlockResult } from 'ccf-database';
import { GlobalConfigState, InfoButtonService, InfoDialogComponent, OrganInfo, PanelData } from 'ccf-shared';
import { Observable, Subscription } from 'rxjs';

import { actionAsFn } from '../../../core/store/action-as-fn';
import {
  GenerateSpatialSearch,
  MoveToNode,
  ResetPosition,
  ResetRadius,
  SetPosition,
  SetRadius,
} from '../../../core/store/spatial-search-ui/spatial-search-ui.actions';
import { SpatialSearchUiSelectors } from '../../../core/store/spatial-search-ui/spatial-search-ui.selectors';
import { Position, RadiusSettings, TermResult } from '../../../core/store/spatial-search-ui/spatial-search-ui.state';
import { SpatialSearchConfigBehaviorComponent } from '../spatial-search-config-behavior/spatial-search-config-behavior.component';
import { Sex } from '../spatial-search-config/spatial-search-config.component';
import { SpatialSearchUiComponent } from '../spatial-search-ui/spatial-search-ui.component';

/**
 * Behavioral component for Spatial Search UI
 */
@Component({
  selector: 'ccf-spatial-search-ui-behavior',
  templateUrl: './spatial-search-ui-behavior.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpatialSearchUiBehaviorComponent {
  @Select(SpatialSearchUiSelectors.scene)
  readonly scene$!: Observable<SpatialSceneNode[]>;

  @Select(SpatialSearchUiSelectors.sceneBounds)
  readonly sceneBounds$!: Observable<Position>;

  @Select(SpatialSearchUiSelectors.sceneTarget)
  readonly sceneTarget$!: Observable<Position>;

  @Select(SpatialSearchUiSelectors.sex)
  readonly sex$!: Observable<Sex>;

  @Select(SpatialSearchUiSelectors.organ)
  readonly organ$!: Observable<OrganInfo | undefined>;

  @Select(SpatialSearchUiSelectors.position)
  readonly position$!: Observable<Position>;

  @Select(SpatialSearchUiSelectors.defaultPosition)
  readonly defaultPosition$!: Observable<Position>;

  @Select(SpatialSearchUiSelectors.radius)
  readonly radius$!: Observable<number>;

  @Select(SpatialSearchUiSelectors.radiusSettings)
  readonly radiusSettings$!: Observable<RadiusSettings>;

  @Select(SpatialSearchUiSelectors.tissueBlocks)
  readonly tissueBlocks$!: Observable<TissueBlockResult[]>;

  @Select(SpatialSearchUiSelectors.anatomicalStructures)
  readonly anatomicalStructures$!: Observable<TermResult[]>;

  @Select(SpatialSearchUiSelectors.cellTypes)
  readonly cellTypes$!: Observable<TermResult[]>;

  @Dispatch()
  readonly updatePosition = actionAsFn(SetPosition);

  @Dispatch()
  readonly resetPosition = actionAsFn(ResetPosition);

  @Dispatch()
  readonly moveToNode = actionAsFn(MoveToNode);

  @Dispatch()
  readonly updateRadius = actionAsFn(SetRadius);

  @Dispatch()
  readonly resetRadius = actionAsFn(ResetRadius);

  /** Data to be displayed in the info panel */
  panelData!: PanelData;

  baseHref = '';

  /** Subscriptions for the info panel data */
  private readonly subscriptions = new Subscription();

  constructor(
    private readonly dialogRef: MatDialogRef<SpatialSearchUiComponent>,
    public dialog: MatDialog,
    private readonly infoService: InfoButtonService,
    private readonly globalConfig: GlobalConfigState<{ baseHref: string }>
  ) {
    this.globalConfig.getOption('baseHref').subscribe((ref) => {
      this.baseHref = ref;
    });
  }

  /**
   * Launchs info dialog with the input data
   * @param data Data for the info dialog
   */
  launchInfoDialog(data: PanelData): void {
    this.subscriptions.unsubscribe();
    this.dialog.open(InfoDialogComponent, {
      autoFocus: false,
      panelClass: 'modal-animated',
      width: '72rem',
      data: {
        title: data.infoTitle,
        content: data.content,
        videoID: data.videoID,
      },
    });
  }

  /**
   * Updates dialog with spatial search information
   */
  onDialogButtonClick(): void {
    this.infoService.updateData(
      this.baseHref + 'assets/docs/SPATIAL_SEARCH_README.md',
      'UfxMpzatowE',
      'Spatial Search'
    );
    const panelContent$ = this.infoService.panelContent.asObservable();
    this.subscriptions.add(
      panelContent$.subscribe((data) => {
        if (data.content.length) {
          this.panelData = data;
          this.launchInfoDialog(this.panelData);
        }
      })
    );
  }

  /**
   * Closes spatial search UI
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Adds a new spatial search and closes the spatial search UI
   * @returns spatial search
   */
  @Dispatch()
  addSpatialSearch(): GenerateSpatialSearch {
    this.close();
    return new GenerateSpatialSearch();
  }

  /**
   * Closes the spatial search UI and opens spatial search config
   */
  openSpatialSearchConfig(): void {
    this.close();
    this.dialog.open(SpatialSearchConfigBehaviorComponent);
  }
}
