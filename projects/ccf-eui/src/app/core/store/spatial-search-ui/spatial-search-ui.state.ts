import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';
import { SceneState } from '../scene/scene.state';
import { SetOrgan, SetSex } from './spatial-search-ui.actions';

/**
 * Contains sex and organId for the Spatial Search
 */
export interface SpatialSearchUiModel {
  sex: Sex;
  organId?: string;
}


@State<SpatialSearchUiModel>({
  name: 'spatialSearchUi',
  defaults: {
    sex: 'male',
    organId: undefined
  }
})
@Injectable()
export class SpatialSearchUiState {
  constructor(
    private readonly store: Store,
    private readonly ga: GoogleAnalyticsService
  ) { }

  /**
   * Updates sex in the SpatialSearchUI and sets selected organ to undefined if not valid for the sex
   */
  @Action(SetSex)
  setSex(ctx: StateContext<SpatialSearchUiModel>, { sex }: SetSex): void {
    const { organId } = ctx.getState();

    ctx.patchState({ sex });
    if (organId !== undefined && !this.organValidForSex(organId, sex)) {
      ctx.dispatch(new SetOrgan(undefined));
    }

    this.ga.event('set_sex', 'spatial_search_ui', sex);
  }

  /**
   * Updates organId in the SpatialSearchUI
   */
  @Action(SetOrgan)
  setOrgan(ctx: StateContext<SpatialSearchUiModel>, { organId }: SetOrgan): void {
    ctx.patchState({ organId });
    this.ga.event('set_organ', 'spatial_search_ui', organId);
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
