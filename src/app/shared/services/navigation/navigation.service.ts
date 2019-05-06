import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Navigate, RouterState } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { concat } from 'lodash';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';

import { NavigationStateModel } from '../../state/navigation/navigation.model';
import { NavigationState } from '../../state/navigation/navigation.state';


/**
 * Creates an observable that emits a path and then completes on every subscription.
 *
 * @param path The path to emit.
 * @returns The new observable emitting a single path.
 */
function createSinglePathObservable(path: string | any[]): Observable<string | any[]> {
  const subject = new ReplaySubject<string | any[]>(1);
  subject.next(path);
  subject.complete();
  return subject.asObservable();
}

/**
 * Creates an observable that emits a path constructed from a prefix and
 * an identifier from another observable.
 *
 * @param prefix The path prefix.
 * @param identifier An observable emitting identifiers.
 * @returns The new observable emitting the constructed paths.
 */
function createPathWithIdentifier(prefix: string | any[], identifier: Observable<any>): Observable<string | any[]> {
  return identifier.pipe(
    distinctUntilChanged(),
    map(id => id && concat(prefix, id))
  );
}

/**
 * Contains utility for managing url to different locations in the app.
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /**
   * Currently active url.
   */
  @Select(RouterState.url)
  private url: Observable<string>;

  /**
   * Listener on the nagivation state.
   */
  @Select(NavigationState)
  private navigation: Observable<NavigationStateModel>;

  /**
   * The path to the home view.
   */
  readonly homePath = createSinglePathObservable('/home');

  /**
   * The path to the body view.
   */
  readonly bodyPath = createSinglePathObservable('/body');

  /**
   * The path to the tissues browser view.
   */
  readonly tissuesBrowserPath = createSinglePathObservable('/tissues');

  /**
   * The path to the currently active organ view.
   */
  readonly organPath = createPathWithIdentifier('/organ', this.navigation.pipe(pluck('activeOrgan', 'id')));

  /**
   * The path to the currently active tissue view.
   */
  readonly tissuePath = createPathWithIdentifier('/tissue', this.navigation.pipe(pluck('activeTissue', 'id')));

  /**
   * Determines whether the home route is active.
   */
  readonly isHomeActive = this.url.pipe(map(url => url === '/home'));

  /**
   * Creates an url to the organ view for a specific organ.
   *
   * @param organId The tissue identifier.
   * @returns The url segments.
   */
  createOrganPath(organId: string): any[] {
    return ['/organ', organId];
  }

  /**
   * Creates an url to the tissue view for a specific tissue.
   *
   * @param tissueId The tissue identifier.
   * @returns The url segments.
   */
  createTissuePath(tissueId: string): any[] {
    return ['/tissue', tissueId];
  }

  /**
   * Causes a router change to the home view.
   */
  @Dispatch()
  navigateToHome(): Navigate {
    return new Navigate(['/home']);
  }
}
