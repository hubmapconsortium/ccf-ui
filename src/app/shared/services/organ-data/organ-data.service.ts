import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { NavigationState } from '../../state/navigation/navigation.state';

@Injectable()
export class OrganDataService {
  /**
   * Path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly pathToImages = environment.ccfAssetUrl + '/body/';

  /**
   * Emits the currently active organ.
   */
  @Select(NavigationState.activeOrgan)
  private activeOrgan: Observable<{ id: string }>; // FIXME: Update with proper organ object

  /**
   * Gets organ source path
   * @returns Observable of organ source path
   */
  getOrganSourcePath(): Observable<string> {
    return this.activeOrgan.pipe(
      pluck('id'),
      map(id => id && `${this.pathToImages}/${id}/`)
    );
  }
}
