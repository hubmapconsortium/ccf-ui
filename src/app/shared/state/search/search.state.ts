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

/**
 * Helper class for building a filter function from common patterns.
 */
export class FilterBuilder<T> {
  /**
   * The filters to 'and' together into a single filter.
   */
  private filters: ((obj: T) => boolean)[] = [];

  /**
   * Add a filter which matches the value at a propery path.
   *
   * @param path Path to the property to match.
   * @param value The value to match against.
   */
  addMatches(path: PropertyPath, value: any): this {
    if (value !== undefined) {
      this.filters.push(matchesProperty(path, value));
    }
    return this;
  }

  /**
   * Add a filter that checks that the value at a property path is in a set.
   *
   * @param path Path to the property.
   * @param values The set of values to match against.
   */
  addIncludes(path: PropertyPath, values: any[]): this {
    if (values !== undefined && values.length > 0) {
      this.filters.push(obj => includes(values, get(obj, path)));
    }
    return this;
  }

  /**
   * Adds compare
   *
   * @param path Path to the property.
   * @param op Comparison operation to apply.
   * @param value Second value to send to the comparison.
   */
  addCompare<U>(path: PropertyPath, op: (value: U, other: U) => boolean, value: U): this {
    if (op !== undefined && value !== undefined) {
      this.filters.push(obj => op(get(obj, path), value));
    }
    return this;
  }

  /**
   * Converts this builder into a single filter function.
   *
   * @returns The constructed filter function.
   */
  toFilter(): (obj: T) => boolean {
    return overEvery(this.filters);
  }
}

/**
 * Contains the currently active search parameters.
 */
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

  /**
   * Updates the gender of the active search.
   */
  @Action(SetGenderFilter)
  setGender(ctx: StateContext<SearchStateModel>, action: SetGenderFilter): void {
    ctx.patchState({ gender: action.gender });
  }

  /**
   * Updates the age range of the active search.
   */
  @Action(SetAgeRangeFilter)
  setAgeRange(ctx: StateContext<SearchStateModel>, action: SetAgeRangeFilter): void {
    ctx.patchState({ ageRange: [action.min, action.max] });
  }

  /**
   * Adds a TMC to the active search.
   */
 @Action(SelectTMC)
  addTMC(ctx: StateContext<SearchStateModel>, action: SelectTMC): void {
    const state = ctx.getState();
    ctx.patchState({ tmc: [...state.tmc, action.tmc] });
  }

  /**
   * Removes a TMC to the active search.
   */
  @Action(UnselectTMC)
  removeTMC(ctx: StateContext<SearchStateModel>, action: UnselectTMC): void {
    const state = ctx.getState();
    ctx.patchState({ tmc: without(state.tmc, action.tmc) });
  }

  /**
   * Adds a technology to the active search.
   */
  @Action(SelectTechnology)
  addTechnology(ctx: StateContext<SearchStateModel>, action: SelectTechnology): void {
    const state = ctx.getState();
    ctx.patchState({ technologies: [...state.technologies, action.technology] });
  }

  /**
   * Removes a technology to the active search.
   */
  @Action(UnselectTMC)
  removeTechnology(ctx: StateContext<SearchStateModel>, action: UnselectTechnology): void {
    const state = ctx.getState();
    ctx.patchState({ technologies: without(state.technologies, action.technology) });
  }
}
