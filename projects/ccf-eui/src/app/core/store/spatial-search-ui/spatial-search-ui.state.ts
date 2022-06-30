import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Filter, getOriginScene, SpatialEntity, SpatialSceneNode, TissueBlockResult } from 'ccf-database';
import { DataSourceService } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { forkJoin, Observable } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';

import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';
import { DataStateSelectors } from '../data/data.selectors';
import { DataState } from '../data/data.state';
import { SceneState } from '../scene/scene.state';
import { ResetPosition, ResetRadius, SetOrgan, SetPosition, SetRadius, SetSex, UpdateSpatialSearch } from './spatial-search-ui.actions';


export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface RadiusSettings {
  min: number;
  max: number;
  defaultValue: number;
}

export interface TermResult {
  '@id': string;
  label: string;
  count: number;
}

export interface SpatialSearchUiModel {
  sex: Sex;
  organId?: string;
  position?: Position;
  radius?: number;

  defaultPosition?: Position;
  radiusSettings?: RadiusSettings;

  organScene?: SpatialSceneNode[];
  spatialSearchScene?: SpatialSceneNode[];
  tissueBlocks?: TissueBlockResult[];
  anatomicalStructures?: Record<string, number>;
  cellTypes?: Record<string, number>;
}


@State<SpatialSearchUiModel>({
  name: 'spatialSearchUi',
  defaults: {
    sex: 'female'
  }
})
@Injectable()
export class SpatialSearchUiState {
  @Selector([SpatialSearchUiState, SceneState.referenceOrganEntities])
  static organEntity(state: SpatialSearchUiModel, organs: SpatialEntity[]): SpatialEntity | undefined {
    const { organId, sex } = state;
    return organs.find(o => o.representation_of === organId && o.sex?.toLowerCase() === sex);
  }

  constructor(
    private readonly dataSource: DataSourceService,
    private readonly store: Store,
    private readonly ga: GoogleAnalyticsService
  ) { }

  /**
   * Updates sex in the SpatialSearchUI and sets selected organ to undefined if not valid for the sex
   */
  @Action(SetSex)
  setSex(ctx: StateContext<SpatialSearchUiModel>, { sex }: SetSex): Observable<unknown> | void {
    const { organId } = ctx.getState();
    ctx.patchState({ sex });
    this.ga.event('set_sex', 'spatial_search_ui', sex);

    if (organId !== undefined && !this.organValidForSex(organId, sex)) {
      return ctx.dispatch(new SetOrgan(undefined));
    }
  }

  /**
   * Updates organId in the SpatialSearchUI
   */
  @Action(SetOrgan)
  setOrgan(ctx: StateContext<SpatialSearchUiModel>, { organId }: SetOrgan): Observable<unknown> | void {
    const { sex } = ctx.getState();
    ctx.setState({ sex, organId });
    const shortOrgan = organId?.split('/').slice(-1)[0];
    this.ga.event('set_organ', 'spatial_search_ui', shortOrgan);

    const organ = this.store.selectSnapshot(SpatialSearchUiState.organEntity);
    if (organ && organId && organ.sex) {
      const { x_dimension: width, y_dimension: height, z_dimension: depth } = organ;
      const position = { x: Math.round(width / 2), y: Math.round(height / 2), z: Math.round(depth / 2) };
      const defaultRadius = Math.round(Math.max(width, height, depth) * 0.07);
      const globalFilter = this.store.selectSnapshot(DataStateSelectors.filter);
      const filter = {
        ...globalFilter,
        sex: organ.sex,
        ontologyTerms: [ organId ],
        spatialSearches: []
      };

      return this.dataSource
        .getReferenceOrganScene(organId, filter)
        .pipe(
          take(1),
          tap((organScene: SpatialSceneNode[]) => {
            ctx.patchState({
              position,
              radius: defaultRadius,
              defaultPosition: position,
              radiusSettings: { min: 5, max: Math.floor(width), defaultValue: defaultRadius },
              organScene: getOriginScene(organ).concat(organScene)
            });
          }),
          mergeMap(() => ctx.dispatch(new UpdateSpatialSearch()))
        );
    }
  }

  /**
   * Updates position in the SpatialSearchUI
   */
  @Action(SetPosition)
  setPosition(ctx: StateContext<SpatialSearchUiModel>, { position }: SetPosition): void {
    ctx.patchState({ position });

    const { x, y, z } = position;
    this.ga.event('set_position', 'spatial_search_ui', `${x}_${y}_${z}`);
  }

  @Action(ResetPosition)
  resetPosition(ctx: StateContext<SpatialSearchUiModel>): void {
    const { defaultPosition } = ctx.getState();
    ctx.patchState({ position: defaultPosition });

    const { x, y, z } = defaultPosition ?? { x: 0, y: 0, z: 0 };
    this.ga.event('reset_position', 'spatial_search_ui', `${x}_${y}_${z}`);
  }

  /**
   * Updates radius in the SpatialSearchUI
   */
  @Action(SetRadius)
  setRadius(ctx: StateContext<SpatialSearchUiModel>, { radius }: SetRadius): void {
    ctx.patchState({ radius });

    this.ga.event('set_radius', 'spatial_search_ui', radius.toFixed(1));
  }

  @Action(ResetRadius)
  resetRadius(ctx: StateContext<SpatialSearchUiModel>): void {
    const { radiusSettings } = ctx.getState();
    const radius = radiusSettings?.defaultValue ?? 0;
    ctx.patchState({ radius });

    this.ga.event('reset_radius', 'spatial_search_ui', radius.toFixed(1));
  }

  /**
   * Updates the spatial search data as the organ, position, and radius changes
   */
  @Action(UpdateSpatialSearch)
  updateSpatialSearch(ctx: StateContext<SpatialSearchUiModel>): Observable<unknown> | void {
    const { position, radius } = ctx.getState();
    const organ = this.store.selectSnapshot(SpatialSearchUiState.organEntity);
    if (organ && position && radius && organ.representation_of) {
      const db = this.dataSource;
      const organId = organ.representation_of;
      const globalFilter = this.store.selectSnapshot(DataStateSelectors.filter);
      const filter: Filter = {
        ...globalFilter,
        sex: organ.sex as 'Male' | 'Female',
        ontologyTerms: [ organId ],
        spatialSearches: [{
          ...position,
          radius: radius,
          target: organ['@id']
        }]
      };

      return forkJoin({
        spatialSearchScene: db.getReferenceOrganScene(organId, filter).pipe(take(1)),
        tissueBlocks: db.getTissueBlockResults(filter).pipe(take(1)),
        anatomicalStructures: db.getOntologyTermOccurences(filter).pipe(take(1)),
        cellTypes: db.getCellTypeTermOccurences(filter).pipe(take(1))
      }).pipe(
        tap((data: Partial<SpatialSearchUiModel>) => ctx.patchState(data))
      );
    }
  }

  /**
   * Used to determine if an organ should be listed if a certain sex is selected
   */
  private organValidForSex(organId: string, sex: Sex): boolean {
    const organs = this.store.selectSnapshot(SceneState.referenceOrgans);
    const organ = organs.find(o => o.id === organId)!;
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    return organ.hasSex || organ.sex === sex;
  }
}
