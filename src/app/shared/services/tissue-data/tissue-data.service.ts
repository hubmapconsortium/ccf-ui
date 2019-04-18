import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { TissueImage } from '../../state/database/database.models';
import { NavigationState } from '../../state/navigation/navigation.state';

/**
 * Injectable data service for individual tissue view's data
 */
@Injectable()
export class TissueDataService {
  /**
   * Emits the currently active tissue image.
   */
  @Select(NavigationState.activeTissue)
  private activeTissue: Observable<TissueImage>;

  /**
   * Gets tissue source path
   * @returns Observable of tissue source path
   */
  getTissueSourcePath(): Observable<string> {
    return this.activeTissue.pipe(pluck('tileUrl'));
  }

  /**
   * Gets the metadata for the queried tissue-id
   * @returns Observable for metadata for the tissue
   */
  getMetadata(): Observable<{[label: string]: string}> {
    return this.activeTissue.pipe(pluck('metadata'));
  }

  getOrganName(): Observable<string> {
    return this.activeTissue.pipe(pluck('slice', 'sample', 'patient', 'anatomicalLocations', 0));
  }
}
