import { RouterNavigation } from '@ngxs/router-plugin';
import { Action, State, StateContext } from '@ngxs/store';
import { get as loGet } from 'lodash';
import { Observable } from 'rxjs';

import { NavigationStateModel } from './navigation.model';

/**
 * State storing the active navigations.
 */
@State<NavigationStateModel>({
  name: 'navigation',
  defaults: {
    activeOrganId: undefined,
    activeTissueId: undefined,
    activeBodyId: undefined
  }
})
export class NavigationState {
  /**
   * Updates the state on navigation to an organ or tissue.
   */
  @Action(RouterNavigation)
  updateActiveFromRoute({ patchState }: StateContext<NavigationStateModel>, action: RouterNavigation): Observable<void> | void {
    const { organId, tissueId, bodyId } = loGet(action, ['routerState', 'root', 'firstChild', 'params'], { });
    if (organId !== undefined) {
      patchState({
        activeOrganId: organId,
        activeBodyId: bodyId,
        activeTissueId: undefined
      });
    } else if (tissueId !== undefined) {
      patchState({
        activeOrganId: undefined,
        activeTissueId: tissueId
      });
      // Lookup organ id for this tissue
    }
  }
}
