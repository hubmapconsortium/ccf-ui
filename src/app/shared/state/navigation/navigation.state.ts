import { RouterNavigation } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { get as loGet } from 'lodash';
import { Observable } from 'rxjs';

import { NavigationStateModel } from './navigation.model';

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
  updateActiveFromRoute({ patchState }: StateContext<NavigationStateModel>, action: RouterNavigation): Observable<void> | void {
    const { organId, tissueId } = loGet(action, ['routerState', 'root', 'firstChild', 'params'], { });
    if (organId !== undefined) {
      patchState({
        activeOrganId: organId,
        activeTissueId: undefined
      });
    } else if (tissueId !== undefined) {
      // Lookup organ id for this tissue
    }
  }

  // TODO
}
