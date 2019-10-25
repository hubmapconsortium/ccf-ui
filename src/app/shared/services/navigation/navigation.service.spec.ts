import { Component, NgModule, Type } from '@angular/core';
import { RouterNavigation } from '@ngxs/router-plugin';
import { Actions, ofAction, Store } from '@ngxs/store';
import { take } from 'rxjs/operators';
import { Shallow } from 'shallow-render';

import { TissueImage } from '../../state/database/database.models';
import { NavigationStateModel } from '../../state/navigation/navigation.model';
import { NavigationService } from './navigation.service';

@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('NavigationService', () => {
  let actions: Actions;
  let get: <T>(type: Type<T>) => T;
  let service: NavigationService;
  let shallow: Shallow<TestComponent>;
  let store: Store;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .dontMock(NavigationService);

    ({ get } = await shallow.render());
    actions = get(Actions);
    store = get(Store);
    service = get(NavigationService);
  });

  function describePath(
    path: 'homePath' | 'bodyPath' | 'tissuesBrowserPath' | 'organPath' | 'tissuePath',
    defaultState?: Partial<NavigationStateModel>, nullState?: Partial<NavigationStateModel>
  ): void {
    function beforeEachResetState(state?: Partial<NavigationStateModel>): void {
      if (state) { beforeEach(() => store.reset({ navigation: state })); }
    }

    function getValue(): Promise<string | any[]> {
      return service[path].pipe(take(1)).toPromise();
    }

    describe(path, () => {
      describe('with default state', () => {
        beforeEachResetState(defaultState);
        it('produces full valid paths', async () => {
          expect(await getValue()).toBeTruthy();
        });
      });

      if (nullState) {
        describe('with null state', () => {
          beforeEachResetState(nullState);
          it('produces undefined', async () => {
            expect(await getValue()).toBeUndefined();
          });
        });
      }
    });
  }

  describePath('homePath');
  describePath('tissuesBrowserPath');
  describePath('bodyPath');
  describePath('organPath', { activeOrgan: { id: 'oid' } }, { });
  describePath('tissuePath', { activeTissue: { id: 'tid' } as TissueImage }, { });

  describe('isHomeActive', () => {
    let result: boolean;
    function beforeEachSetUrl(url: string): void {
      beforeEach(async () => {
        store.reset({ router: { state: { url } } });
        result = await service.isHomeActive.pipe(take(1)).toPromise();
      });
    }

    describe('when url === /home', () => {
      beforeEachSetUrl('/home');
      it('emits true', () => {
        expect(result).toBeTruthy();
      });
    });

    describe('when url is anything else', () => {
      beforeEachSetUrl('abcdef');
      it('emits false', () => {
        expect(result).toBeFalsy();
      });
    });
  });

  function describePathCreation(methodName: 'createOrganPath' | 'createTissuePath'): void {
    describe(`${methodName}(identifier)`, () => {
      let path: any[];
      beforeEach(() => path = service[methodName]('testid'));

      it('returns an array of path segments', () => {
        expect(path).toEqual(jasmine.any(Array));
      });

      it('contains the identifier', () => {
        expect(path).toContain('testid');
      });
    });
  }

  describePathCreation('createOrganPath');
  describePathCreation('createTissuePath');

  function describeNavigation(methodName: 'navigateToHome' | 'navigateToTissueBrowser', ...args: any[]): void {
    describe(`${methodName}(${args.join(', ')})`, () => {
      let reaction: Promise<any>;
      beforeEach(() => {
        reaction = actions.pipe(ofAction(RouterNavigation), take(1)).toPromise();
        (service[methodName] as Function)(...args);
      });

      it('causes a route change', async () => {
        expect(await reaction).toBeTruthy();
      });
    });
  }

  describeNavigation('navigateToHome');
  describeNavigation('navigateToTissueBrowser');
});
