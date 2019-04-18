import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { RouterState } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable, of as rxOf, of } from 'rxjs';
import { map as rxMap, pluck, map } from 'rxjs/operators';

import { LocalDatabaseService } from '../database/local/local-database.service';
import { NavigationState } from '../../state/navigation/navigation.state';
import { NavigationStateModel } from '../../state/navigation/navigation.model';


@Injectable()
export class BodyDataService {
  /**
   * Path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly pathToImages = 'assets/ccf/body';

  /**
   * Emits the current navigation state.
   */
  @Select(NavigationState)
  private navigationState: Observable<NavigationStateModel>;

  /**
   * Gets body source path
   * @returns Observable of body source path
   */
  getBodySourcePath(): Observable<string> {
    return this.navigationState.pipe(
      pluck('activeBodyId'),
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
