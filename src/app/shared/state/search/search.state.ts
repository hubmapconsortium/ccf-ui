import { Action, Selector, State, StateContext } from '@ngxs/store';
import { without } from 'lodash';

import { Compare, FilterBuilder } from '../../common/filter/filter-builder';
import { Patient, TissueImage, TissueSample, TissueSlice } from '../database/database.models';
import { OntologyNode } from '../ontology/ontology.model';
import {
  SelectTechnology,
  SelectTMC,
  SetAgeRangeFilter,
  SetGenderFilter,
  SetLocation,
  UnselectTechnology,
  UnselectTMC,
} from './search.action';
import { SearchStateModel } from './search.model';

/**
 * Contains the currently active search parameters.
 */
@State<SearchStateModel>({
  name: 'search',
  defaults: {
    gender: undefined,
    ageRange: [undefined, undefined],
    tmc: [],
    technologies: [],
    location: undefined
  }
})
export class SearchState {
  /**
   * Selects the current ontology node location.
   */
  @Selector()
  static location(state: SearchStateModel): OntologyNode {
    return state.location;
  }

  /**
   * Creates a filter function for patient image objects based on the current search state.
   * @param state A sanpshot of the current state.
   * @returns A filter function that returns true for all objects matching the current search.
   */
  @Selector()
  static patientFilterBuilder(state: SearchStateModel): FilterBuilder<Patient> {
    const { gender, ageRange: [min, max], tmc, location = { id: undefined } } = state;
    return new FilterBuilder<Patient>()
      .addMatches('gender', gender)
      .addCompare('age', Compare.greater_than_equal, min)
      .addCompare('age', Compare.less_than_equal, max)
      .addIncludedIn('provider', tmc)
      .addIncludes('ontologyNodeIds', location.id);
  }

  /**
   * Creates a filter function for tissue sample objects based on the current search state.
   *
   * @param state A snapshot of the current state.
   * @returns A filter function that returns true for all objects matching the current search.
   */
  @Selector()
  static tissueSampleFilterBuilder(state: SearchStateModel): FilterBuilder<TissueSample> {
    const { gender, ageRange: [min, max], tmc, location = { id: undefined } } = state;
    return new FilterBuilder<TissueSample>()
      .addMatches('patient.gender', gender)
      .addCompare('patient.age', Compare.greater_than_equal, min)
      .addCompare('patient.age', Compare.less_than_equal, max)
      .addIncludedIn('patient.provider', tmc)
      .addIncludes('patient.ontologyNodeIds', location.id);
  }

  /**
   * Creates a filter function for tissue slice objects based on the current search state.
   *
   * @param state A snapshot of the current state.
   * @returns A filter function that returns true for all objects matching the current search.
   */
  @Selector()
  static tissueSliceFilterBuilder(state: SearchStateModel): FilterBuilder<TissueSlice> {
    const { gender, ageRange: [min, max], tmc, location = { id: undefined } } = state;
    return new FilterBuilder<TissueSlice>()
      .addMatches('sample.patient.gender', gender)
      .addCompare('sample.patient.age', Compare.greater_than_equal, min)
      .addCompare('sample.patient.age', Compare.less_than_equal, max)
      .addIncludedIn('sample.patient.provider', tmc)
      .addIncludes('sample.patient.ontologyNodeIds', location.id);
  }

  /**
   * Creates a filter function for tissue image objects based on the current search state.
   *
   * @param state A snapshot of the current state.
   * @returns A filter function that returns true for all objects matching the current search.
   */
  @Selector()
  static tissueImageFilterBuilder(state: SearchStateModel): FilterBuilder<TissueImage> {
    const { gender, ageRange: [min, max], tmc, technologies, location = { id: undefined } } = state;
    return new FilterBuilder<TissueImage>()
      .addMatches('slice.sample.patient.gender', gender)
      .addCompare('slice.sample.patient.age', Compare.greater_than_equal, min)
      .addCompare('slice.sample.patient.age', Compare.less_than_equal, max)
      .addIncludedIn('slice.sample.patient.provider', tmc)
      .addIncludes('slice.sample.patient.ontologyNodeIds', location.id)
      .addIncludedIn('technology', technologies);
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
  @Action(UnselectTechnology)
  removeTechnology(ctx: StateContext<SearchStateModel>, action: UnselectTechnology): void {
    const state = ctx.getState();
    ctx.patchState({ technologies: without(state.technologies, action.technology) });
  }

  /**
   * Set the active search ontology location.
   */
  @Action(SetLocation)
  setLocation(ctx: StateContext<SearchStateModel>, action: SetLocation): void {
    ctx.patchState({ location: action.location });
  }
}
