import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { RouterState } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';

import { LocalDatabaseService } from '../database/local/local-database.service';

@Injectable()
export class OrganDataService {
  constructor(private readonly localDatabase: LocalDatabaseService) { }
  /**
   * Selector observable for instance of RouterStateSnapshot
   */
  @Select(RouterState.state)
  private routeState: Observable<RouterStateSnapshot>;
  /**
   * Path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly pathToImages = 'assets/ccf/organ/';
  /**
   * Image file names - TODO - these will come from a json file eventually
   */
  private readonly imageSources = {
    heart: '/heart/',
    kidney: '/kidney/'
  };
  /**
   * Gets organ source path
   * @returns Observable of organ source path
   */
  getOrganSourcePath(): Observable<string> {
    return this.routeState.pipe(rxMap(state => {
      return state && this.pathToImages + this.imageSources[+state.root.firstChild.params.organId];
    }));
  }
  /**
   * TODO - based on the data format, the logic needs to be updated
   * Gets the metadata for the queried tissue-id
   * @returns Observable for metadata for the tissue
   */
  getMetadata(): Observable<string> {
    return this.routeState.pipe(rxMap(state => {
      return state && 'organ' + state.root.firstChild.params.organId + 'sample data!';
    }));
  }
}
