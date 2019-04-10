import { RouterNavigation } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { get as loGet } from 'lodash';
import { Observable } from 'rxjs';
import { pluck as rxPluck, tap as rxTap } from 'rxjs/operators';

import { NavigationStateModel } from './navigation.model';
import { LocalDatabaseService } from '../../services/database/local/local-database.service';

/**
 * State storing the active navigations.
 */
@State<NavigationStateModel>({
  name: 'navigation',
  defaults: {
    activeOrganId: undefined,
    activeTissueId: undefined
  }
})
export class NavigationState {
  /**
   * Updates the state on navigation to an organ or tissue.
   */
  @Action(RouterNavigation)
  updateActiveFromRoute(ctx: StateContext<NavigationStateModel>, action: RouterNavigation): Observable<any> | void {
    const { organId, tissueId } = loGet(action, ['routerState', 'root', 'firstChild', 'params'], { });
    if (organId !== undefined) {
      this.setActiveOrganId(ctx, organId);
    } else if (tissueId !== undefined) {
      return this.setActiveTissueId(ctx, tissueId);
    }
  }

  /**
   * Creates an instance of navigation state.
   *
   * @param database The local database (WIP)
   */
  constructor(private database: LocalDatabaseService) { }

  /**
   * Sets the active organ id.
   */
  private setActiveOrganId(ctx: StateContext<NavigationStateModel>, organId: string): void {
    const { activeOrganId } = ctx.getState();
    if (organId !== activeOrganId) {
      ctx.patchState({
        activeOrganId: organId,
        activeTissueId: undefined
      });
    }
  }

  /**
   * Sets the active tissue id.
   */
  private setActiveTissueId(ctx: StateContext<NavigationStateModel>, tissueId: string): Observable<any> | void {
    const { activeTissueId } = ctx.getState();
    if (tissueId !== activeTissueId) {
      ctx.patchState({
        activeOrganId: undefined,
        activeTissueId: tissueId
      });

      return this.database.getTissueImages(image => image.id === tissueId).pipe(
        rxPluck(0, 'slice', 'sample', 'patient', 'anatomicalLocations', 0),
        rxTap(organId => ctx.patchState({
          activeOrganId: organId
        }))
      );
    }
  }
}
