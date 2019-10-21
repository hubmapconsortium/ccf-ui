import { Component, NgModule, Type } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of, throwError } from 'rxjs';
import { Shallow } from 'shallow-render';

import { LocalDatabaseService } from '../../services/database/local/local-database.service';
import { NavigationService } from '../../services/navigation/navigation.service';
import { TissueImage } from '../../state/database/database.models';
import { NavigationStateModel } from '../../state/navigation/navigation.model';
import { TissueResolverService } from './tissue-resolver.service';

@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('TissueResolverService', () => {
  let get: <T>(type: Type<T>) => T;
  let service: TissueResolverService;
  let shallow: Shallow<TestComponent>;
  let store: Store;

  function createActivatedTissueRoute(id: string): ActivatedRouteSnapshot {
    const route = { params: { tissueId: id } as any };
    return route as ActivatedRouteSnapshot;
  }

  function beforeEachResetState(state: Partial<NavigationStateModel>): void {
    if (state) { beforeEach(() => store.reset({ navigation: state })); }
  }

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .dontMock(TissueResolverService);

    ({ get } = await shallow.render());
    store = get(Store);
    service = get(TissueResolverService);
  });

  describe('resolve(route)', () => {
    const tissueId1 = 'tid';
    const tissueId2 = 'tid2';
    const tissue1 = { id: tissueId1 } as TissueImage;
    const tissue2 = { id: tissueId2 } as TissueImage;
    const route1 = createActivatedTissueRoute(tissueId1);
    const route2 = createActivatedTissueRoute(tissueId2);

    function fakeGetTissueImages(filter: (tissue: TissueImage) => boolean): Observable<TissueImage[]> {
      const tissues = filter(tissue1) ? [tissue1] : [];
      return of(tissues);
    }

    describe('when :tissueId is the same as the active tissue\'s id', () => {
      const state = { activeTissue: tissue1 };
      beforeEachResetState(state);

      it('returns the active tissue', () => {
        expect(service.resolve(route1)).toEqual(tissue1);
      });
    });

    describe('when :tissueId matches an entry in the tissues array' , () => {
      const state = { tissues: [tissue2, tissue1] };
      beforeEachResetState(state);

      it('returns the matching tissue', () => {
        expect(service.resolve(route1)).toEqual(tissue1);
      });
    });

    describe('when :tissueId doesn\'t match any tissues in the state', () => {
      let getTissueImages: jasmine.Spy;
      let navigateToHome: jasmine.Spy;

      beforeEach(() => {
        const database = get(LocalDatabaseService);
        getTissueImages = spyOn(database, 'getTissueImages');
        getTissueImages.and.callFake(fakeGetTissueImages);

        const navigator = get(NavigationService);
        navigateToHome = spyOn(navigator, 'navigateToHome');
      });

      it('queries the database for the tissue', () => {
        service.resolve(route1);
        expect(getTissueImages).toHaveBeenCalled();
      });

      it('returns an observable', () => {
        expect(service.resolve(route1)).toEqual(jasmine.any(Observable));
      });

      describe('when the database contain a matching tissue', () => {
        it('yields a single tissue', async () => {
          const result = await (service.resolve(route1) as Observable<TissueImage>).toPromise();
          expect(result).toEqual(tissue1);
        });
      });

      function describeFailure(
        description: string, route: ActivatedRouteSnapshot, setup?: () => void
      ): void {
        describe(description, () => {
          let result: TissueImage;
          if (setup) { beforeEach(() => setup()); }
          beforeEach(async () => result = await (service.resolve(route) as any).toPromise());

          it('yields no values', async () => {
            expect(result).toBeUndefined();
          });

          it('navigates to home', () => {
            expect(navigateToHome).toHaveBeenCalled();
          });
        });
      }

      describeFailure('when the database does not containe a matching tissue', route2);
      describeFailure('when the database errors', route1, () => {
        getTissueImages.and.callFake(() => throwError('A database error'));
      });
    });
  });
});
