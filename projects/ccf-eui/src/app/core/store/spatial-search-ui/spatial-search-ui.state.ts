import { Injectable } from '@angular/core';
import { Matrix4 } from '@math.gl/core';
import { Action, Actions, ofActionDispatched, Selector, State, StateContext, Store } from '@ngxs/store';
import { Filter, getOriginScene, SpatialEntity, SpatialSceneNode, SpatialSearch, TissueBlockResult } from 'ccf-database';
import { DataSourceService, OrganInfo } from 'ccf-shared';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { forkJoin, Observable } from 'rxjs';
import { debounceTime, mergeMap, take, tap } from 'rxjs/operators';

import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';
import { UpdateFilter } from '../data/data.actions';
import { DataStateSelectors } from '../data/data.selectors';
import { SceneState } from '../scene/scene.state';
import { AddSearch } from '../spatial-search-filter/spatial-search-filter.actions';
import { SpatialSearchFilterSelectors } from '../spatial-search-filter/spatial-search-filter.selectors';
import {
  GenerateSpatialSearch,
  MoveToNode,
  ResetPosition,
  ResetRadius,
  SetExecuteSearchOnGenerate,
  SetOrgan,
  SetPosition,
  SetRadius,
  SetSex,
  StartSpatialSearchFlow,
  UpdateSpatialSearch,
} from './spatial-search-ui.actions';


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
  // eslint-disable-next-line @typescript-eslint/naming-convention
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

  referenceOrgans?: OrganInfo[];
  organScene?: SpatialSceneNode[];

  spatialSearchScene?: SpatialSceneNode[];
  tissueBlocks?: TissueBlockResult[];
  anatomicalStructures?: Record<string, number>;
  cellTypes?: Record<string, number>;

  executeSearchOnGeneration: boolean;
}

class ReallyUpdateSpatialSearch {
  static readonly type = '[SpatialSearchUi] Really update spatial search data';
}


@State<SpatialSearchUiModel>({
  name: 'spatialSearchUi',
  defaults: {
    sex: 'female',
    executeSearchOnGeneration: true
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
    actions$: Actions,
    private readonly ga: GoogleAnalyticsService
  ) {
    actions$.pipe(
      ofActionDispatched(UpdateSpatialSearch),
      debounceTime(500),
      tap(() => store.dispatch(ReallyUpdateSpatialSearch))
    ).subscribe();
  }

  @Action(StartSpatialSearchFlow)
  startSpatialSearchFlow(ctx: StateContext<SpatialSearchUiModel>): Observable<unknown> {
    const { sex, organId } = ctx.getState();
    const shortOrgan = organId?.split('/').slice(-1)[0];
    this.ga.event('set_organ', 'spatial_search_ui', `${sex}_${shortOrgan}`);

    return ctx.dispatch(new SetSex(sex));
  }

  /**
   * Updates sex in the SpatialSearchUI and sets selected organ to undefined if not valid for the sex
   */
  @Action(SetSex)
  setSex(ctx: StateContext<SpatialSearchUiModel>, { sex }: SetSex): Observable<unknown> | void {
    let { organId } = ctx.getState();
    ctx.patchState({ sex });
    this.ga.event('set_sex', 'spatial_search_ui', sex);

    if (organId !== undefined && !this.organValidForSex(organId, sex)) {
      organId = undefined;
    }

    const filter = {
      ...this.store.selectSnapshot(DataStateSelectors.filter),
      spatialSearches: []
    };
    const referenceOrgans = this.store.selectSnapshot(SceneState.referenceOrgans);

    return this.dataSource.getOntologyTermOccurences(filter).pipe(
      take(1),
      tap((counts: Record<string, number>) => {
        ctx.patchState({
          referenceOrgans: referenceOrgans.filter((o) => o.id && !o.disabled && counts[o.id] > 0)
        });
        ctx.dispatch(new SetOrgan(organId));
      })
    );
  }

  /**
   * Updates organId in the SpatialSearchUI
   */
  @Action(SetOrgan)
  setOrgan(ctx: StateContext<SpatialSearchUiModel>, { organId }: SetOrgan): Observable<unknown> | void {
    const { sex } = ctx.getState();
    ctx.patchState({ sex, organId });
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
        ontologyTerms: [organId],
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
              radiusSettings: { min: Math.min(defaultRadius, 5), max: Math.floor(Math.max(width, height, depth) / 1.5), defaultValue: defaultRadius },
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
    ctx.dispatch(new UpdateSpatialSearch());

    const { x, y, z } = position;
    this.ga.event('set_position', 'spatial_search_ui', `${x}_${y}_${z}`);
  }

  @Action(ResetPosition)
  resetPosition(ctx: StateContext<SpatialSearchUiModel>): void {
    const { defaultPosition } = ctx.getState();
    ctx.patchState({ position: defaultPosition });
    ctx.dispatch(new UpdateSpatialSearch());

    const { x, y, z } = defaultPosition ?? { x: 0, y: 0, z: 0 };
    this.ga.event('reset_position', 'spatial_search_ui', `${x}_${y}_${z}`);
  }

  @Action(MoveToNode)
  moveToNode(ctx: StateContext<SpatialSearchUiModel>, { node }: MoveToNode): Observable<unknown> | void {
    const matrix = new Matrix4(node.transformMatrix);
    const [x, y, z] = matrix.getTranslation().map(n => Math.round(n * 1000));
    const position: Position = { x, y, z };

    return ctx.dispatch(new SetPosition(position));
  }

  /**
   * Updates radius in the SpatialSearchUI
   */
  @Action(SetRadius)
  setRadius(ctx: StateContext<SpatialSearchUiModel>, { radius }: SetRadius): void {
    ctx.patchState({ radius });
    ctx.dispatch(new UpdateSpatialSearch());

    this.ga.event('set_radius', 'spatial_search_ui', radius.toFixed(1));
  }

  @Action(ResetRadius)
  resetRadius(ctx: StateContext<SpatialSearchUiModel>): void {
    const { radiusSettings } = ctx.getState();
    const radius = radiusSettings?.defaultValue ?? 0;
    ctx.patchState({ radius });
    ctx.dispatch(new UpdateSpatialSearch());

    this.ga.event('reset_radius', 'spatial_search_ui', radius.toFixed(1));
  }

  /**
   * Updates the spatial search data as the organ, position, and radius changes
   */
  @Action(ReallyUpdateSpatialSearch)
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
        ontologyTerms: [organId],
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
   * Generates and adds a new spatial search then resets the ui state
   */
  @Action(GenerateSpatialSearch)
  generateSpatialSearch(ctx: StateContext<SpatialSearchUiModel>): Observable<unknown> | void {
    const { position, radius, sex, organId, referenceOrgans = [], executeSearchOnGeneration } = ctx.getState();
    const organ = this.store.selectSnapshot(SpatialSearchUiState.organEntity);
    const info = referenceOrgans.find(item => item.id === organId);
    // const { spatialSearches = [] } = this.store.selectSnapshot(DataStateSelectors.filter);

    if (position && radius && organ?.representation_of && info) {
      const search: SpatialSearch = {
        ...position,
        radius,
        target: organ['@id']
      };
      const actions: unknown[] = [new AddSearch(sex, info.name, search)];

      if (executeSearchOnGeneration) {
        const searches = this.store.selectSnapshot(SpatialSearchFilterSelectors.selectedSearches);
        actions.push(new UpdateFilter({
          spatialSearches: searches.concat(search)
        }));
      }

      this.ga.event('generate_search', 'spatial_search_ui');
      return ctx.dispatch(actions).pipe(
        tap(() => ctx.patchState({
          sex: 'female',
          organId: undefined
        }))
      );
    }
  }

  @Action(SetExecuteSearchOnGenerate)
  setExecuteSearchOnGenerate(ctx: StateContext<SpatialSearchUiModel>, { execute }: SetExecuteSearchOnGenerate): void {
    ctx.patchState({
      executeSearchOnGeneration: execute
    });
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
