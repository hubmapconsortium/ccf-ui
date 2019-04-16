import { Injectable } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { RouterState } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter as rxFilter, pluck as rxPluck, switchMap as rxSwitchMap } from 'rxjs/operators';

import { TissueImage } from '../../state/database/database.models';
import { LocalDatabaseService } from '../database/local/local-database.service';

/**
 * Injectable data service for individual tissue view's data
 */
@Injectable()
export class TissueDataService {
  /**
   * Selector observable for instance of RouterStateSnapshot
   */
  @Select(RouterState.state)
  private routeState: Observable<RouterStateSnapshot>;
  /**
   * Tissue image observable to fetch tissueImages based on the tissueId in the route url
   */
  private tissueImageObservable: Observable<TissueImage[]>;

  /**
   * Creates an instance of tissue data service.
   * @param database instance of LocalDatabaseService
   */
  constructor(private database: LocalDatabaseService) {
    this.tissueImageObservable = this.routeState.pipe(
      rxPluck('root', 'firstChild', 'params', 'tissueId'),
      rxFilter(tissueId => tissueId !== undefined),
      rxSwitchMap(tissueId => this.database.getTissueImages((image) => image.id === tissueId))
    );
  }

  /**
   * Gets tissue source path
   * @returns Observable of tissue source path
   */
  getTissueSourcePath(): Observable<string> {
    return this.tissueImageObservable.pipe(rxPluck(0, 'tileUrl'));
  }

  /**
   * TODO - based on the data format, the logic needs to be updated
   * Gets the metadata for the queried tissue-id
   * @returns Observable for metadata for the tissue
   */
  getMetadata(): Observable<{[label: string]: string}> {
    return this.tissueImageObservable.pipe(rxPluck(0, 'metadata'));
  }

  getOrganName(): Observable<string> {
    return this.tissueImageObservable.pipe(rxPluck(0, 'slice', 'sample', 'patient', 'anatomicalLocations', 0));
  }
}
