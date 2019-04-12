import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { RouterState } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable, of as rxOf } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';

import { LocalDatabaseService } from '../database/local/local-database.service';


@Injectable()
export class BodyDataService {
  constructor(private readonly localDatabase: LocalDatabaseService) { }
  /**
   * Selector observable for instance of RouterStateSnapshot
   */
  @Select(RouterState.state)
  private routeState: Observable<RouterStateSnapshot>;
  /**
   * Path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly pathToImages = 'assets/ccf/body/';

  /**
   * Gets body source path
   * @returns Observable of body source path
   */
  getBodySourcePath(): Observable<string> {
    return this.routeState.pipe(rxMap(state => {
      return state && this.pathToImages + state.root.firstChild.params.bodyId + '/';
    }));
  }
  /**
   * TODO - based on the data format, the logic needs to be updated
   * Gets the metadata for the queried tissue-id
   * @returns Observable for metadata for the tissue
   */
  getMetadata(): Observable<string> {
    return this.routeState.pipe(rxMap(state => {
      return state && '';
    }));
  }

  /**
   * TODO - this should come from a service
   */
  getBodyOverlays(): Observable<{id: string, path: string}[]> {
    return rxOf(['kidney', 'heart'].map(s => {
      return {id: s, path: `${this.pathToImages}/overlays/${s}/${s}.svg`};
    }));
  }
}
