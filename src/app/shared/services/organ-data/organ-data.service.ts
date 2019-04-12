import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { RouterState } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';

@Injectable()
export class OrganDataService {
  constructor() { }
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
   * Gets organ source path
   * @returns Observable of organ source path
   */
  getOrganSourcePath(): Observable<string> {
    return this.routeState.pipe(rxMap(state => {
      return state && this.pathToImages + '/' + state.root.firstChild.params.organId + '/';
    }));
  }
}
