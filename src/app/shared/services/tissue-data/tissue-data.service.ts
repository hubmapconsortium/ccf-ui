import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { find, includes, map as loMap, some, toLower } from 'lodash';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, pluck, share, switchMap } from 'rxjs/operators';

import { TissueImage, TissueOverlay } from '../../state/database/database.models';
import { NavigationState } from '../../state/navigation/navigation.state';
import { OntologyNode } from '../../state/ontology/ontology.model';
import { SearchState } from '../../state/search/search.state';
import { LocalDatabaseService } from '../database/local/local-database.service';

/**
 * Injectable data service for individual tissue view's data
 */
@Injectable()
export class TissueDataService {
  /**
   * Emits the currently active tissue image.
   */
  @Select(NavigationState.activeTissue)
  private activeTissue: Observable<TissueImage>;

  /**
   * Emits the current ontology node location.
   */
  @Select(SearchState.location)
  private location: Observable<OntologyNode>;

  /**
   * Emits overlays for the currently active tissue image.
   */
  private tissueOverlay$ = this.activeTissue.pipe(
    switchMap(active => this.database.getTissueOverlays(overlay => overlay.image === active)),
    share()
  );

  /**
   * Emits whenever an overlay should be activated from the current search.
   */
  activatedOverlay$ = combineLatest(
    [this.location, this.tissueOverlay$]
  ).pipe(
    filter(([location]) => !!location),
    map(([location, overlays]) => this.findMatchingOverlay(location, overlays)),
    filter(overlay => !!overlay),
    share()
  );

  /**
   * Creates an instance of tissue data service.
   *
   * @param database The database
   */
  constructor(private database: LocalDatabaseService) { }

  /**
   * Gets tissue source path
   * @returns Observable of tissue source path
   */
  getTissueSourcePath(): Observable<string> {
    return this.activeTissue.pipe(pluck('tileUrl'));
  }

  /**
   * Gets tissue pixels per meter
   * @returns Observable of tissue pixels per meter
   */
  getTissuePixelsPerMeter(): Observable<number> {
    return this.activeTissue.pipe(pluck('pixelsPerMeter'));
  }

  /**
   * Gets tissue overlays
   * @returns Observable of overlays
   */
  getTissueOverlays(): Observable<TissueOverlay[]> {
    return this.tissueOverlay$;
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

  /**
   * Finds the overlay that matches an ontology node.
   *
   * @param location The ontology node.
   * @param overlays The overlays.
   * @returns The matching overlay object or undefined if no match.
   */
  private findMatchingOverlay(location: OntologyNode, overlays: TissueOverlay[]): TissueOverlay {
    return find(overlays, overlay => {
      const locations = loMap(overlay.anatomicalLocations, toLower);
      if (includes(locations, toLower(location.id))) { return true; }
      if (includes(locations, toLower(location.label))) { return true; }
      return some(location.synonymLabels, synonym => includes(locations, toLower(synonym)));
    });
  }
}
