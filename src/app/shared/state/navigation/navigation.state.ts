import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterNavigation } from '@ngxs/router-plugin';
import { Action, State, StateContext, NgxsOnInit } from '@ngxs/store';

import { LocalDatabaseService } from '../../services/database/local/local-database.service';
import { TissueImage } from '../database/database.models';
import { NavigationStateModel } from './navigation.model';
import { take } from 'rxjs/operators';

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
export class NavigationState implements NgxsOnInit {
  /**
   * Updates the state on navigation to an organ or tissue.
   */
  @Action(RouterNavigation)
  updateActiveFromRoute(ctx: StateContext<NavigationStateModel>, action: RouterNavigation): void {
    const route = action.routerState.root.firstChild;
    if (!route) { return; }

    const { tissueId, organId } = route.params;
    if (tissueId) {
      this.setActiveTissue(ctx, route);
    } else if (organId) {
      this.setActiveOrgan(ctx, route);
    }
  }

  /**
   * Creates an instance of navigation state.
   *
   * @param database The local database (WIP)
   */
  constructor(private database: LocalDatabaseService) { }

  /**
   * Initializes the state from the database.
   *
   * @param ctx The state context.
   */
  ngxsOnInit(ctx: StateContext<NavigationStateModel>): void {
    // FIXME: WIP
    this.database.getTissueImages().pipe(take(1)).subscribe(tissues => ctx.patchState({
      tissues
    }));
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
