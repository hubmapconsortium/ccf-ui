import { TestBed } from '@angular/core/testing';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Actions, NgxsModule, ofActionDispatched, Store } from '@ngxs/store';
import { take as rxTake, timeout as rxTimeout } from 'rxjs/operators';

import { RegisterIcon, RegistrationError, RegistrationSuccess } from './icon-registry.action';
import { IconRegistryState } from './icon-registry.state';

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
  const mockedSanitizer = {
    bypassSecurityTrustResourceUrl: noop,
    bypassSecurityTrustHtml: noop
  };

  let store: Store;
  let actions: Actions;

  function describeDispatch(description: string, type: any, action: (() => void) | any): void {
    describe(type.name, () => {
      let event: Promise<any>;

      beforeEach(() => {
        event = actions.pipe(
          ofActionDispatched(type),
          rxTake(1),
          rxTimeout(1000)
        ).toPromise();
      });

      beforeEach(() => {
        if (typeof action === 'function') {
          action();
        } else {
          store.dispatch(action);
        }
      });

      it(description, async () => {
        await event;
        expect(true).toBeTruthy();
      });
    });
  }

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

    describeDispatch(
      'is dispatched on successful icon registration',
      RegistrationSuccess, new RegisterIcon({ url: 'abc'})
    );
    describeDispatch(
      'is dispatched on failed icon registration',
      RegistrationError, new RegisterIcon({ })
    );
  });
});
});
