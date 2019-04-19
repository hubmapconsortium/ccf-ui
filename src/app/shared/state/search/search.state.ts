import { Action, State, StateContext } from '@ngxs/store';
import { without } from 'lodash';

import { SelectTechnology, SelectTMC, SetAgeRangeFilter, SetGenderFilter, UnselectTechnology, UnselectTMC } from './search.action';
import { SearchStateModel } from './search.model';

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    gender: 'male-female',
    ageRange: [undefined, undefined],
    tmc: [],
    technologies: []
  }
})
export class SearchState {
  @Action(SetGenderFilter)
  setGender(ctx: StateContext<SearchStateModel>, action: SetGenderFilter): void {
    ctx.patchState({
      gender: action.gender
    });
  }

  @Action(SetAgeRangeFilter)
  setAgeRange(ctx: StateContext<SearchStateModel>, action: SetAgeRangeFilter): void {
    ctx.patchState({
      ageRange: [action.min, action.max]
    });
  }

 @Action(SelectTMC)
  addTMC(ctx: StateContext<SearchStateModel>, action: SelectTMC): void {
    const state = ctx.getState();
    ctx.patchState({
      tmc: [...state.tmc, action.tmc]
    });
  }

  @Action(UnselectTMC)
  removeTMC(ctx: StateContext<SearchStateModel>, action: UnselectTMC): void {
    const state = ctx.getState();
    ctx.patchState({
      tmc: without(state.tmc, action.tmc)
    });
  }

  @Action(SelectTechnology)
  addTechnology(ctx: StateContext<SearchStateModel>, action: SelectTechnology): void {
    const state = ctx.getState();
    ctx.patchState({
      tmc: [...state.technologies, action.technology]
    });
  }

  @Action(UnselectTMC)
  removeTechnology(ctx: StateContext<SearchStateModel>, action: UnselectTechnology): void {
    const state = ctx.getState();
    ctx.patchState({
      tmc: without(state.technologies, action.technology)
    });
  }
}
