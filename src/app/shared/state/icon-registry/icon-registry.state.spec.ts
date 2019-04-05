import { TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { map as loMap } from 'lodash';
import { take as rxTake, timeout as rxTimeout } from 'rxjs/operators';

import { RegisterIcon, RegistrationSuccess, RegistrationError } from './icon-registry.action';
import { IconDefinition } from './icon-registry.model';
import { IconRegistryState } from './icon-registry.state';
import { Observable } from 'rxjs';

describe('State', () => {
describe('IconRegistry', () => {
  function noop() { }

  const mockedRegistry = {
    addSvgIcon: noop,
    addSvgIconLiteral: noop,
    addSvgIconInNamespace: noop,
    addSvgIconLiteralInNamespace: noop,
    addSvgIconSet: noop,
    addSvgIconSetLiteral: noop,
    addSvgIconSetInNamespace: noop,
    addSvgIconSetLiteralInNamespace: noop
  };
  const mockedSanitizer = {};

  let store: Store;
  let actions: Actions;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([IconRegistryState])],
      providers: [
        { provide: MatIconRegistry, useValue: mockedRegistry },
        { provide: DomSanitizer, useValue: mockedSanitizer }
      ]
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    actions = TestBed.get(Actions);
  });

  describe('actions', () => {
    describe('RegisterIcon', () => {
      function describeMethod(methodName: keyof MatIconRegistry, ...keys: string[]): void {
        describe(`with IconDefinition{${keys.join(', ')}}`, () => {
          const data = keys.reduce((obj, key, index) => ({ ...obj, [key]: 'foo' + index }), { });
          const action = new RegisterIcon(data);
          let spy: jasmine.Spy;

          beforeEach(() => {
            const service: MatIconRegistry = TestBed.get(MatIconRegistry);
            spy = spyOn(service, methodName);
          });

          beforeEach(() => {
            store.dispatch(action);
          });

          it(`calls ${methodName}`, () => {
            expect(spy).toHaveBeenCalled();
          });
        });
      }

      describeMethod('addSvgIcon', 'name', 'url');
      describeMethod('addSvgIconInNamespace', 'name', 'namespace', 'url');
      describeMethod('addSvgIconLiteral', 'name', 'html');
      describeMethod('addSvgIconLiteralInNamespace', 'name', 'namespace', 'html');
      describeMethod('addSvgIconSet', 'url');
      describeMethod('addSvgIconSetInNamespace', 'namespace', 'url');
      describeMethod('addSvgIconSetLiteral', 'html');
      describeMethod('addSvgIconSetLiteralInNamespace', 'namespace', 'html');
    });

    describe('RegistrationSuccess', () => {
      let event: Promise<any>;

      beforeEach(() => {
        event = actions.pipe(
          ofActionDispatched(RegistrationSuccess),
          rxTake(1),
          rxTimeout(1000)
        ).toPromise();
      });

      beforeEach(() => {
        store.dispatch(new RegisterIcon({ url: 'abc' }));
      });

      it('is dispatched on successful icon registration', async () => {
        await event;
        expect(true).toBeTruthy();
      });
    });

    describe('RegistrationError', () => {
      let event: Promise<any>;

      beforeEach(() => {
        event = actions.pipe(
          ofActionDispatched(RegistrationError),
          rxTake(1),
          rxTimeout(1000)
        ).toPromise();
      });

      beforeEach(() => {
        store.dispatch(new RegisterIcon({ }));
      });

      it('is dispatched on failed icon registration', async () => {
        await event;
        expect(true).toBeTruthy();
      });
    });
  });
});
});
