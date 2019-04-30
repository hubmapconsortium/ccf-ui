import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { defaultTo, join } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
 * Creates a description of a search.
 *
 * @param state The search state.
 * @returns The description of the search criteria.
 */
function createSearchCriteriaDescription({ ageRange: [minAge, maxAge], gender }: SearchStateModel): string {
  const ageDescription = `Age ${ defaultTo(minAge, 0) } - ${ defaultTo(maxAge, 125) }`;
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
   *
   * @param [gender] The gender to limit searches to.
   */
  @Dispatch()
  setGender(gender?: 'male' | 'female'): SetGenderFilter {
    return new SetGenderFilter(gender);
  }

  @Dispatch()
  selectTechnology(technology: string) {
    return new SelectTechnology(technology);
  }

  @Dispatch()
  selectTMC(tmc: string) {
    return new SelectTMC(tmc);
  }

  @Dispatch()
  unselectTechnology(technology: string) {
    return new UnselectTechnology(technology);
  }

  @Dispatch()
  unselectTMC(tmc: string) {
    return new UnselectTMC(tmc);
  }
}
