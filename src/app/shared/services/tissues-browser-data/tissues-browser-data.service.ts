import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { TissueImage } from '../../state/database/database.models';
import { NavigationState } from '../../state/navigation/navigation.state';

/**
 * Provides the ontology nodes to display in the tissues browser.
 */
@Injectable()
export class TissuesBrowserDataService {
  /**
   * Emits arrays of tissues corresponding to the current search.
   */
  @Select(NavigationState.tissues)
  data: Observable<TissueImage[]>;
}
