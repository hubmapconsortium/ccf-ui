import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { TissueSample } from '../../state/database/database.models';
import { NavigationState } from '../../state/navigation/navigation.state';
import { LocalDatabaseService } from '../database/local/local-database.service';

/**
 * Injectable organ data service talks to localdatabase.
 */
@Injectable()
export class OrganDataService {

  constructor(
    private readonly localDatabase: LocalDatabaseService
  ) { }
  /**
   * Path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly pathToImages = environment.ccfAssetUrl + '/organ';

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
  /**
   * Gets all tissue samples
   * @returns all tissue samples' observable.
   */
  getAllTissueSamples(): Observable<TissueSample[]> {
    return this.localDatabase.getTissueSamples();
  }
}
