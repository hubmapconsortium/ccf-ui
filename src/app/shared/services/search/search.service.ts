import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { defaultTo, join } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OntologyNode } from '../../state/ontology/ontology.model';
import { OntologyState } from '../../state/ontology/ontology.state';
import {
  SelectTechnology,
  SelectTMC,
  SetAgeRangeFilter,
  SetGenderFilter,
  UnselectTechnology,
  UnselectTMC,
} from '../../state/search/search.action';
import { SearchStateModel } from '../../state/search/search.model';
import { SearchState } from '../../state/search/search.state';

/**
 * defines the constraint on age range.
 * min and max are used in age slider.
 */
export const ageConstraints = {
  min: 18,
  max: 89
};

/**
 * Creates a description of a search.
 *
 * @param state The search state.
 * @returns The description of the search criteria.
 */
function createSearchCriteriaDescription({ ageRange: [minAge, maxAge], gender }: SearchStateModel): string {
  let ageDescription = `Age ${defaultTo(minAge, ageConstraints.min)}-${defaultTo(maxAge, ageConstraints.max + '+')}`;
  if (minAge === maxAge || minAge >= ageConstraints.max || maxAge === ageConstraints.min) {
    if (minAge) {
      ageDescription = `Age ${minAge > ageConstraints.max ? ageConstraints.max + '+' : minAge }`;
    } else if (maxAge !== undefined) {
      ageDescription = `Age ${maxAge}`;
    }
  }
  const genderDescription = gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : 'Female & Male';
  const descriptions = [genderDescription, ageDescription];
  return join(descriptions, ' | ');
}

/**
 * Provides search functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /**
   * Current search state.
   */
  @Select(SearchState)
  private searchState: Observable<SearchStateModel>;

  /**
   * ontology state
   */
  @Select(OntologyState.nodes)
  stateObservable: Observable<OntologyNode[]>;

  /**
   * Emits strings with information about the current search.
   */
  readonly searchCriteria = this.searchState.pipe(map(createSearchCriteriaDescription));

  /**
   * Dispatchs an action to update the search age range.
   *
   * @param [min] The lower bound of the range (inclusive).
   * @param [max] The upper bound of the range (inclusive).
   */
  @Dispatch()
  setAgeRange(min?: number, max?: number): SetAgeRangeFilter {
    return new SetAgeRangeFilter(min, max);
  }

  /**
   * Dispatchs an action to update the search gender.
   * @param [gender] The gender to limit searches to.
   */
  @Dispatch()
  setGender(gender?: 'male' | 'female'): SetGenderFilter {
    return new SetGenderFilter(gender);
  }

  /**
   * Dispatches an action to select the searched technologies category value
   * @param technology selected
   * @returns an action class instance of SelectTechnology
   */
  @Dispatch()
  selectTechnology(technology: string) {
    return new SelectTechnology(technology);
  }

  /**
   * Dispatches an action to select the searched TMCs category value
   * @param tmc selected
   * @returns an action class instance of SelectTMC
   */
  @Dispatch()
  selectTMC(tmc: string) {
    return new SelectTMC(tmc);
  }

  /**
   * Dispatches an action to unselect the Technology category value removed from search
   * @param technology unselected
   * @returns an action class instance of UnselectTechnology
   */
  @Dispatch()
  unselectTechnology(technology: string) {
    return new UnselectTechnology(technology);
  }

  /**
   * Dispatches an action to unselect the TMC category value removed from search
   * @param tmc unselected
   * @returns an action class instance of UnselectTMC
   */
  @Dispatch()
  unselectTMC(tmc: string) {
    return new UnselectTMC(tmc);
  }
}
