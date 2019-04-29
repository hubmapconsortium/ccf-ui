import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

import { SetAgeRangeFilter, SetGenderFilter } from '../../state/search/search.action';

/**
 * Provides search functionality.
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {
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
}
