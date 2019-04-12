import { TestBed } from '@angular/core/testing';
import { RouterNavigation } from '@ngxs/router-plugin';
import { NgxsModule, StateContext, Store } from '@ngxs/store';
import { of as rxOf } from 'rxjs';
import { take as rxTake, timeout as rxTimeout } from 'rxjs/operators';

import { LocalDatabaseService } from '../../services/database/local/local-database.service';
import { NavigationState } from './navigation.state';


describe('State', () => {
describe('Navigation', () => {
  const mockedDatabaseService = {
    getTissueImages(filter: (obj: any) => boolean) {
      filter({ id: 11 });
      return rxOf([
        { slice: { sample: { patient: { anatomicalLocations: ['bar'] } } } }
      ]);
    }
  };

  let store: Store;
  let state: NavigationState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([NavigationState])],
      providers: [
        { provide: LocalDatabaseService, useValue: mockedDatabaseService }
      ]
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
      ctx.getState.and.returnValue({ });
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
        const action = createRouterNavigationAction(undefined, 'foo');

        beforeEach(async () => {
          const result = state.updateActiveFromRoute(ctx, action);
          if (result) {
            await result.pipe(
              rxTake(1),
              rxTimeout(1000)
            ).toPromise();
          }
        });

        it('sets the active tissue id', () => {
          expectPatchStateToHaveBeenCalledWith({ activeTissueId: 'foo' });
        });

        it('sets the active organ id', () => {
          expectPatchStateToHaveBeenCalledWith({ activeOrganId: 'bar' });
        });
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
