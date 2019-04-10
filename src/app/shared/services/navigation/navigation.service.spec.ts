import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule, Store } from '@ngxs/store';
import { take as rxTake, timeout as rxTimeout } from 'rxjs/operators';

import { NavigationState } from '../../state/navigation/navigation.state';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([NavigationState]),
        NgxsRouterPluginModule.forRoot(),
        RouterTestingModule
      ]
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  function describePath(
    name: 'homePath' | 'bodyPath' | 'tissuesBrowserPath' | 'organPath' | 'tissuePath',
    validState?: object, invalidState?: object
  ): void {
    describe(name, () => {
      function getValue(): Promise<string | any[]> {
        return service[name].pipe(
          rxTake(1),
          rxTimeout(1000)
        ).toPromise();
      }

      describe('when state is valid', () => {
        if (validState !== undefined) {
          beforeEach(() => {
            store.reset(validState);
          });
        }

        it('emits valid paths', async () => {
          expect(await getValue()).toBeTruthy();
        });
      });

      describe('when state is invalid', () => {
        if (invalidState !== undefined) {
          beforeEach(() => {
            store.reset(invalidState);
          });

          it('emits undefined', async () => {
            expect(await getValue()).toBeFalsy();
          });
        }
      });
    });
  }

  describePath('homePath');
  describePath('bodyPath');
  describePath('tissuesBrowserPath');
  describePath('organPath', { navigation: { activeOrganId: 'foo' } }, { navigation: { } });
  describePath('tissuePath', { navigation: { activeTissueId: 'foo' } }, { navigation: { } });

  function describePathCreation(methodName: 'createOrganPath' | 'createTissuePath'): void {
    describe(`${methodName}(identifier)`, () => {
      let path: any[];

      beforeEach(() => {
        path = service[methodName]('testid');
      });

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
});
