import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { NavigationState } from '../../state/navigation/navigation.state';
import { LocalDatabaseService } from '../database/local/local-database.service';

export interface CountMetadata {
  patients: number;
  tissueSamples: number;
  tissueSlices: number;
  tissueImages: number;
  cells: number;
}

/**
 * Injectable organ data service talks to local database.
 */
@Injectable()
export class OrganDataService {
  /**
   * Base path to images of tissues - TODO - this will come from a json file eventually
   */
  private readonly basePath = environment.ccfAssetUrl + '/organ';

  /**
   * Emits the currently active organ.
   */
  @Select(NavigationState.activeOrgan)
  private activeOrgan: Observable<{ id: string }>; // FIXME: Update with proper organ object

  /**
   * Emits the path for currently active organ's image.
   */
  readonly organImagePath = this.activeOrgan.pipe(
    pluck('id'),
    map(id => id && `${this.basePath}/${id}/organ.svg#organ`)
  );

  /**
   * Emits the overlay objects for currently active organ.
   */
  readonly organOverlays = this.activeOrgan.pipe(
    pluck('id'),
    switchMap(id => this.localDatabase.getTissueSamples(sample => sample.patient.anatomicalLocations[0] === id))
  );

  /**
   * Creates an instance of organ data service.
   *
   * @param localDatabase Database from which organ and related data is fetched.
   */
  constructor(private readonly localDatabase: LocalDatabaseService) { }
}
