import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

import { Sex } from '../../../shared/components/spatial-search-config/spatial-search-config.component';
import { SceneState } from '../scene/scene.state';
import { SetOrgan, SetSex } from './spatial-search-ui.actions';
import { SpatialSearchUiSelectors } from './spatial-search-ui.selectors';


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

  @Action(SetSex)
  setSex(ctx: StateContext<SpatialSearchUiModel>, { sex }: SetSex): void {
    const organs = this.store.selectSnapshot(SceneState.referenceOrgans);
    const { organId } = ctx.getState();
    const organ = SpatialSearchUiSelectors.organ(organId, organs);
    const organValidForSex = organ ? SpatialSearchUiSelectors.organMatchesSex(organ, sex) : true;
    const newOrganId = organValidForSex ? organId : undefined;

    ctx.patchState({ sex });
    if (newOrganId !== organId) {
      ctx.dispatch(new SetOrgan(newOrganId));
    }

    this.ga.event('set_sex', 'spatial_search_ui', sex);
  }

  @Action(SetOrgan)
  setOrgan(ctx: StateContext<SpatialSearchUiModel>, { organId }: SetOrgan): void {
    ctx.patchState({ organId });
    this.ga.event('set_organ', 'spatial_search_ui', organId);
  }
}
