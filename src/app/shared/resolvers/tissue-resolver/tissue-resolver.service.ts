import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { find } from 'lodash';
import { EMPTY, Observable } from 'rxjs';
import { catchError, filter, map, take, throwIfEmpty } from 'rxjs/operators';

import { LocalDatabaseService } from '../../services/database/local/local-database.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { TissueImage } from '../../state/database/database.models';
import { NavigationStateModel } from '../../state/navigation/navigation.model';
import { NavigationState } from '../../state/navigation/navigation.state';

/**
 * Service for fetching the `TissueImage` object associated with a tissue route.
 */
@Injectable({
  providedIn: 'root'
})
export class TissueResolverService implements Resolve<TissueImage> {
  /**
   * Creates an instance of tissue resolver service.
   *
   * @param database The database from which data is fetched.
   * @param navigator Service used to navigate to the home view in case of errors.
   * @param store The store containing the tissues.
   */
  constructor(
    private database: LocalDatabaseService,
    private navigator: NavigationService,
    private store: Store
  ) { }

  /**
   * Attempt to fetch the `TissueImage` object with an identifier specified by the route.
   *
   * @param route The tissue route that will be activated on successful data fetching.
   * @returns resolve Either the in memory object or an observable returning the database query.
   */
  resolve(route: ActivatedRouteSnapshot): TissueImage | Observable<TissueImage> {
    const { tissueId } = route.params;
    return this.findTissue(tissueId) || this.fetchTissue(tissueId);
  }

  /**
   * Searches the navigation state for a matching tissue object.
   *
   * @param id The identifier of the tissue object to search for.
   * @returns The found tissue object or undefined.
   */
  private findTissue(id: string): TissueImage {
    const snapshot: NavigationStateModel = this.store.selectSnapshot(NavigationState);
    if (snapshot.activeTissue && snapshot.activeTissue.id === id) {
      return snapshot.activeTissue;
    }
    return find(snapshot.tissues, ['id', id]);
  }

  /**
   * Fetches a matching tissue from the database.
   * If no matching tissue is found or an error occurs this will navigate to the home view.
   *
   * @param id The identifier of the tissue object to fetch.
   * @returns An observable yielding a single matching tissue if found.
   */
  private fetchTissue(id: string): Observable<TissueImage> {
    return this.database.getTissueImages(tissue => tissue.id === id).pipe(
      take(1),
      filter(tissues => tissues.length > 0),
      throwIfEmpty(() => new Error(`No tissue for identifier ${id}`)),
      map(([tissue]) => tissue),
      catchError(error => {
        // TODO: Log error
        this.navigator.navigateToHome();
        return EMPTY;
      })
    );
  }
}
