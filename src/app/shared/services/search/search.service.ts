import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

import {
  SelectTechnology,
  SelectTMC,
  SetAgeRangeFilter,
  UnselectTechnology,
  UnselectTMC
} from '../../state/search/search.action';

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
