import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { TissueImage, TissueOverlay } from '../../state/database/database.models';
import { NavigationState } from '../../state/navigation/navigation.state';
import { LocalDatabaseService } from '../database/local/local-database.service';

/**
 * Injectable data service for individual tissue view's data
 */
@Injectable()
export class TissueDataService {

  tissueOverlays: Observable<TissueOverlay[]>;

  constructor(private readonly localDatabaseService: LocalDatabaseService) {
    this.tissueOverlays = this.activeTissue.pipe(switchMap((active) => localDatabaseService.getTissueOverlays(o => o.image === active)));
  }
  /**
   * Emits the currently active tissue image.
   */
  @Select(NavigationState.activeTissue)
  private activeTissue: Observable<TissueImage>;

  /**
   * Gets tissue source path
   * @returns Observable of tissue source path
   */
  getTissueSourcePath(): Observable<string> {
    return this.activeTissue.pipe(pluck('tileUrl'));
  }

  getTissueOverlays(): Observable<TissueOverlay[]> {
    return this.tissueOverlays;
  }

  /**
   * Gets the metadata for the queried tissue-id
   * @returns Observable for metadata for the tissue
   */
  getMetadata(): Observable<{[label: string]: string}> {
    return this.activeTissue.pipe(pluck('metadata'));
  }

  /**
   * Gets organ name
   * @returns organ name
   */
  getOrganName(): Observable<string> {
    return this.activeTissue.pipe(pluck('slice', 'sample', 'patient', 'anatomicalLocations', 0));
  }
}
