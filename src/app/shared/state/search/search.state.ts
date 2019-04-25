import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  get,
  gte as greaterThanEqual,
  includes,
  lte as lessThanEqual,
  matchesProperty,
  overEvery,
  PropertyPath,
  without,
} from 'lodash';

import { TissueImage } from '../database/database.models';
import {
  SelectTechnology,
  SelectTMC,
  SetAgeRangeFilter,
  SetGenderFilter,
  UnselectTechnology,
  UnselectTMC,
} from './search.action';
import { SearchStateModel } from './search.model';

export class FilterBuilder<T> {
  private filters: ((obj: T) => boolean)[] = [];

  addMatches(path: PropertyPath, value: any): this {
    if (value !== undefined) {
      this.filters.push(matchesProperty(path, value));
    }
    return this;
  }

  addIncludes(path: PropertyPath, values: any[]): this {
    if (values !== undefined && values.length > 0) {
      this.filters.push(obj => includes(values, get(obj, path)));
    }
    return this;
  }

  addCompare<U>(path: PropertyPath, op: (value: U, other: U) => boolean, value: U): this {
    if (op !== undefined && value !== undefined) {
      this.filters.push(obj => op(get(obj, path), value));
    }
    return this;
  }

  toFilter(): (obj: T) => boolean {
    return overEvery(this.filters);
  }
}

@State<SearchStateModel>({
  name: 'search',
  defaults: {
    gender: undefined,
    ageRange: [undefined, undefined],
    tmc: [],
    technologies: []
  }
})
export class SearchState {
  /**
   * Creates a filter function for tissue image objects based on the current search state.
   *
   * @param state A snapshot of the current state.
   * @returns A filter function that returns true for all objects matching the current search.
   */
  @Selector()
  static tissueFilterBuilder(state: SearchStateModel): FilterBuilder<TissueImage> {
    const { gender, ageRange: [min, max], tmc, technologies } = state;
    return new FilterBuilder<TissueImage>()
      .addMatches('slice.sample.patient.gender', gender)
      .addCompare('slice.sample.patient.age', greaterThanEqual, min)
      .addCompare('slice.sample.patient.age', lessThanEqual, max)
      .addIncludes('slice.sample.patient.provider', tmc)
      .addIncludes('technology', technologies);
  }

  @Action(SetGenderFilter)
  setGender(ctx: StateContext<SearchStateModel>, action: SetGenderFilter): void {
    ctx.patchState({ gender: action.gender });
  }

  @Action(SetAgeRangeFilter)
  setAgeRange(ctx: StateContext<SearchStateModel>, action: SetAgeRangeFilter): void {
    ctx.patchState({ ageRange: [action.min, action.max] });
  }

 @Action(SelectTMC)
  addTMC(ctx: StateContext<SearchStateModel>, action: SelectTMC): void {
    const state = ctx.getState();
    ctx.patchState({ tmc: [...state.tmc, action.tmc] });
  }

  @Action(UnselectTMC)
  removeTMC(ctx: StateContext<SearchStateModel>, action: UnselectTMC): void {
    const state = ctx.getState();
    ctx.patchState({ tmc: without(state.tmc, action.tmc) });
  }

  @Action(SelectTechnology)
  addTechnology(ctx: StateContext<SearchStateModel>, action: SelectTechnology): void {
    const state = ctx.getState();
    ctx.patchState({ technologies: [...state.technologies, action.technology] });
  }

  @Action(UnselectTMC)
  removeTechnology(ctx: StateContext<SearchStateModel>, action: UnselectTechnology): void {
    const state = ctx.getState();
    ctx.patchState({ technologies: without(state.technologies, action.technology) });
  }
}
