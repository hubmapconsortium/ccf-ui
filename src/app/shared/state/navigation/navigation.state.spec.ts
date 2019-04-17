import { Component, NgModule, Type } from '@angular/core';
import { RouterNavigation } from '@ngxs/router-plugin';
import { StateContext } from '@ngxs/store';
import { set } from 'lodash';
import { Shallow } from 'shallow-render';

import { LocalDatabaseService } from '../../services/database/local/local-database.service';
import { NavigationState } from './navigation.state';

@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('NavigationState', () => {
  let ctx: { [K in (keyof StateContext<any>)]: jasmine.Spy };
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<TestComponent>;
  let state: NavigationState;

  function createRoute(organId?: string, tissueId?: string, tissueOrganId?: string): RouterNavigation {
    const params = { tissueId, organId };
    const data = { id: tissueId };
    const route = { };
    set(data, 'slice.sample.patient.anatomicalLocations', [tissueOrganId]);
    set(route, 'routerState.root.firstChild.params', params);
    set(route, 'routerState.root.firstChild.data.tissue', tissueId && data);
    return route as RouterNavigation;
  }

  function expectStateToBePatched(partial: object): void {
    expect(ctx.patchState).toHaveBeenCalledWith(jasmine.objectContaining(partial));
  }

  beforeEach(async () => {
    const initialState = { };
    set(initialState, 'activeOrgan.id', 'initial-oid');

    shallow = new Shallow(TestComponent, TestModule)
      .dontMock(NavigationState)
      .mock(LocalDatabaseService, { });

    ({ get } = await shallow.render());
    state = get(NavigationState);

    ctx = jasmine.createSpyObj('context', ['dispatch', 'patchState', 'setState', 'getState']);
    ctx.getState.and.returnValue(initialState);
  });

  describe('actions', () => {
    describe('updateActiveFromRoute(ctx, action)', () => {
      const tissueId = 'tid';
      const organId = 'oid';

      describe('when route is /tissue/:tissueId', () => {
        const route = createRoute(undefined, tissueId, organId);
        beforeEach(() => state.updateActiveFromRoute(ctx, route));

        it('sets the active tissue object', () => {
          expectStateToBePatched({ activeTissue: { id: tissueId, slice: jasmine.anything() } });
        });

        it('sets the associated organ object', () => {
          expectStateToBePatched({ activeOrgan: { id: organId } });
        });
      });

      describe('when route is /organ/:organId', () => {
        const route = createRoute(organId);
        beforeEach(() => state.updateActiveFromRoute(ctx, route));

        it('sets the active organ object', () => {
          expectStateToBePatched({ activeOrgan: { id: organId } });
        });

        it('unsets the active tissue object', () => {
          expectStateToBePatched({ activeTissue: undefined });
        });
      });

      describe('when route is <unknown>', () => {
        const route = set({ }, 'routerState.root.firstChild', null) as RouterNavigation;
        beforeEach(() => state.updateActiveFromRoute(ctx, route));

        it('does nothing', () => {
          expect(ctx.setState).not.toHaveBeenCalled();
          expect(ctx.patchState).not.toHaveBeenCalled();
          expect(ctx.dispatch).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('selectors', () => {
    // Additional tests
  });
});
