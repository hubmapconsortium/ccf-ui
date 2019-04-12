import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { RouterState } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
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
      console.log(state.root.firstChild.params);
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
}
