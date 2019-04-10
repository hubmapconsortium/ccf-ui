import { Store, NgxsModule, StateContext } from '@ngxs/store';
import { TestBed } from '@angular/core/testing';
import { NavigationState } from './navigation.state';
import { RouterNavigation } from '@ngxs/router-plugin';
import { NavigationStateModel } from './navigation.model';


describe('State', () => {
describe('Navigation', () => {
  let store: Store;
  let state: NavigationState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([NavigationState])]
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    state = TestBed.get(NavigationState);
  });

  describe('Actions', () => {
    let ctx: { [K in (keyof StateContext<any>)]: jasmine.Spy };

    function expectPatchStateToHaveBeenCalledWith(partial: object): void {
      expect(ctx.patchState).toHaveBeenCalledWith(jasmine.objectContaining(partial));
    }

    beforeEach(() => {
      ctx = jasmine.createSpyObj('context', ['dispatch', 'patchState', 'setState', 'getState']);
    });

    describe('updateActiveFromRoute(ctx, action)', () => {
      function createRouterNavigationAction(organId?: string, tissueId?: string): RouterNavigation {
        return { routerState: { root: { firstChild: { params: { organId, tissueId } } } } } as any;
      }

      describe('when routing to organ', () => {
        const action = createRouterNavigationAction('abc');

        beforeEach(() => {
          state.updateActiveFromRoute(ctx, action);
        });

        it('sets the active organ id', () => {
          expectPatchStateToHaveBeenCalledWith({ activeOrganId: 'abc' });
        });

        it('unsets the active tissue id', () => {
          expectPatchStateToHaveBeenCalledWith({ activeTissueId: undefined });
        });
      });

      describe('when routing to tissue', () => {
        // TODO: Create tests when implemented.
      });

      describe('when routing to anything else', () => {
        const action = createRouterNavigationAction();

        beforeEach(() => {
          state.updateActiveFromRoute(ctx, action);
        });

        it('has no effect', () => {
          expect(ctx.dispatch).not.toHaveBeenCalled();
          expect(ctx.patchState).not.toHaveBeenCalled();
          expect(ctx.setState).not.toHaveBeenCalled();
        });
      });
    });

    // Additional tests
  });

  describe('Selectors', () => {
    // Additional tests
  });
});
});
