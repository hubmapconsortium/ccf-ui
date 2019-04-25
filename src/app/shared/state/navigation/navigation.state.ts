import { OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterNavigation } from '@ngxs/router-plugin';
import { Action, NgxsOnInit, Selector, State, StateContext, Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { LocalDatabaseService } from '../../services/database/local/local-database.service';
import { TissueImage } from '../database/database.models';
import { SearchState } from '../search/search.state';
import { NavigationStateModel } from './navigation.model';

/**
 * State storing the active navigations.
 */
@State<NavigationStateModel>({
  name: 'navigation',
  defaults: {
    tissues: [],
    activeTissue: undefined,
    activeOrgan: undefined,

    activeBodyId: 'female'
  }
})
export class NavigationState implements NgxsOnInit, OnDestroy {
  /**
   * Subscription for getting the active tissues.
   */
  private tissuesSubscription: Subscription;

  /**
   * Selector for the `TissueImage` array.
   */
  @Selector()
  static tissues(state: NavigationStateModel): TissueImage[] {
    return state.tissues;
  }

  /**
   * Selector for the currently active tissue.
   */
  @Selector()
  static activeTissue(state: NavigationStateModel): TissueImage | undefined {
    return state.activeTissue;
  }

  /**
   * Selector for the currently active organ.
   */
  @Selector()
  static activeOrgan(state: NavigationStateModel): { id: string } | undefined { // FIXME: Update with proper organ object
    return state.activeOrgan;
  }

  /**
   * Updates the state on navigation to an organ or tissue.
   */
  @Action(RouterNavigation)
  updateActiveFromRoute(ctx: StateContext<NavigationStateModel>, action: RouterNavigation): void {
    const route = action.routerState.root.firstChild;
    if (!route) { return; }

    const { tissueId, organId, bodyId } = route.params;
    if (tissueId) {
      this.setActiveTissue(ctx, route);
    } else if (organId) {
      this.setActiveOrgan(ctx, route);
    } else if (bodyId) {
      ctx.patchState({ activeBodyId: bodyId });
    }
  }

  /**
   * Creates an instance of navigation state.
   *
   * @param database The local database.
   * @param store The global ngxs store.
   */
  constructor(private database: LocalDatabaseService, private store: Store) { }

  /**
   * Initializes the state from the database.
   *
   * @param ctx The state context.
   */
  ngxsOnInit(ctx: StateContext<NavigationStateModel>): void {
    const { database, store } = this;
    const tissuesSource = store.select(SearchState.tissueFilterBuilder).pipe(
      filter(builder => !!builder),
      map(builder => builder.toFilter()),
      switchMap(tissueFilter => database.getTissueImages(tissueFilter))
    );

    this.tissuesSubscription = tissuesSource.subscribe(tissues => ctx.patchState({ tissues }));
  }

  /**
   * Angular's OnDestroy lifecycle hook.
   * Cleans up subscriptions.
   */
  ngOnDestroy() {
    this.tissuesSubscription.unsubscribe();
  }

  /**
   * Sets the active based on from the route.
   *
   * @param ctx The state context.
   * @param route The active route to a tissue.
   */
  setActiveTissue(ctx: StateContext<NavigationStateModel>, route: ActivatedRouteSnapshot): void {
    const state = ctx.getState();
    const tissue: TissueImage = route.data['tissue'];
    if (tissue && state.activeTissue !== tissue) {
      ctx.patchState({
        activeTissue: tissue,
        activeOrgan: { id: tissue.slice.sample.patient.anatomicalLocations[0] } // FIXME: Update with proper organ object
      });
    }
  }

  /**
   * Sets the active organ based on the route.
   *
   * @param ctx The state context.
   * @param route The active route to an organ.
   */
  setActiveOrgan(ctx: StateContext<NavigationStateModel>, route: ActivatedRouteSnapshot): void {
    const state = ctx.getState();
    const id: string = route.params['organId'];
    if (!state.activeOrgan || state.activeOrgan.id !== id) {
      ctx.patchState({
        activeTissue: undefined,
        activeOrgan: { id: id } // FIXME: Update with proper organ object
      });
    }
  }
}
