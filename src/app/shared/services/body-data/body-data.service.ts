import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { SearchStateModel } from '../../state/search/search.model';
import { SearchState } from '../../state/search/search.state';

@Injectable()
export class BodyDataService {
  /**
   * Path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly pathToImages = environment.ccfAssetUrl + '/body';

  /**
   * Emits the current search state.
   */
  @Select(SearchState)
  private searchState: Observable<SearchStateModel>;

  /**
   * Gets body source path
   * @returns Observable of body source path
   */
  getBodySourcePath(): Observable<string> {
    return this.searchState.pipe(
      pluck('gender'),
      map(gender => gender !== undefined ? gender : 'both'),
      map(id => id && `${this.pathToImages}/${id}/`)
    );
  }

  /**
   * TODO - based on the data format, the logic needs to be updated
   * Gets the metadata for the queried tissue-id
   * @returns Observable for metadata for the tissue
   */
  getMetadata(): Observable<string> {
    return of('');
  }

  /**
   * TODO - this should come from a service
   */
  getBodyOverlays(): Observable<{id: string, path: string}[]> {
    return of(['kidney', 'heart'].map(s => {
      return {id: s, path: `${this.pathToImages}/overlays/${s}/${s}.svg`};
    }));
  }
}
