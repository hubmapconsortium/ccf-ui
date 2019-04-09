import { Injectable } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Navigate } from '@ngxs/router-plugin';
import { Select } from '@ngxs/store';
import { Observable, ReplaySubject } from 'rxjs';
import { map as rxMap, distinctUntilChanged as rxDistinctUntilChanged, pluck as rxPluck } from 'rxjs/operators';
import { concat as loConcat } from 'lodash';

import { NavigationState } from '../../state/navigation/navigation.state';
import { OntologyNode } from '../../state/ontology/ontology.model';
import { NavigationStateModel } from '../../state/navigation/navigation.model';


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
    rxDistinctUntilChanged(),
    rxMap(id => id && loConcat(prefix, id))
  );
}

/**
 * Contains functions for navigating to different parts of the app.
 */
@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  @Select(NavigationState)
  private navigation: Observable<NavigationStateModel>;

  readonly homePath = createSinglePathObservable('/home');
  readonly bodyPath = createSinglePathObservable('/body');
  readonly tissuesBrowserPath = createSinglePathObservable('/tissues');
  readonly organPath = createPathWithIdentifier('/organ', this.navigation.pipe(rxPluck('activeOrganId')));
  readonly tissuePath = createPathWithIdentifier('/tissue', this.navigation.pipe(rxPluck('activeTissueId')));

  createOrganPath(organId: string): any[] {
    return ['/organ', organId];
  }

  createTissuePath(tissueId: string): any[] {
    return ['/tissue', tissueId];
  }

  /**
   * Navigates the tissue page with the specified tissue displayed.
   *
   * @param idOrNode The identifier or ontology node for the tissue.
   */
  @Dispatch()
  navigateToTissue(idOrNode: string | OntologyNode): Navigate {
    const id = typeof idOrNode === 'string' ? idOrNode : idOrNode.id;
    return new Navigate(['/tissue', id]);
  }
}
