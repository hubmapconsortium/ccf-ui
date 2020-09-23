import { TestBed } from '@angular/core/testing';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalsService } from 'ccf-shared';
import { Observable, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import * as FileSaver from 'file-saver';

import { ModelState, ModelStateModel } from '../model/model.state';
import { PageState, PageStateModel } from '../page/page.state';
import { RegistrationState } from './registration.state';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return obs.pipe(take(1)).toPromise();
}


describe('RegistrationState', () => {
  const initialPageState: Partial<PageStateModel> = {
    embedded: true,
    user: {
      firstName: 'foo',
      lastName: 'bar'
    }
  };
  const initialModelState: Partial<ModelStateModel> = {
    id: 'a-b-c',
    blockSize: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 }
  };

  let pageStateSubject: ReplaySubject<Partial<PageStateModel>>;
  let modelStateSubject: ReplaySubject<Partial<ModelStateModel>>;
  let state: RegistrationState;

  beforeEach(() => {
    pageStateSubject = new ReplaySubject();
    pageStateSubject.next(initialPageState);

    modelStateSubject = new ReplaySubject();
    modelStateSubject.next(initialModelState);

    const mockGlobalsService = jasmine.createSpyObj<GlobalsService>(
      'GlobalsService', ['get']
    );

    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([RegistrationState])
      ],
      providers: [
        { provide: PageState, useValue: {
            state$: pageStateSubject,
            snapshot: initialPageState
          }
        },
        { provide: ModelState, useValue: {
            state$: modelStateSubject,
            snapshot: initialModelState
          }
        },
        { provide: GlobalsService, useValue: mockGlobalsService }
      ]
    });

    TestBed.inject(Store).reset({
      registration: {
        useRegistrationCallback: false
      }
    });

    state = TestBed.inject(RegistrationState);
  });

  describe('.metadata$', () => {
    it('is based on current state', async () => {
      const value = await nextValue(state.metadata$);
      expect(value).toContain({ label: 'Tissue Block Rotation', value: '0, 0, 0' });
    });

    it('has extra fields if its embedded', async () => {
      pageStateSubject.next({ ...initialPageState, embedded: false });

      const value = await nextValue(state.metadata$);
      expect(value).toContain({ label: 'First Name', value: 'foo' });
    });
  });

  describe('.jsonld$', () => {
    it('creates jsonld objects', async () => {
      const value = await nextValue(state.jsonld$);
      expect(value).toBeInstanceOf(Object);
    });
  });

  describe('setUseRegistrationCallback', () => {
    it('updates use registration callback', async () => {
      state.setUseRegistrationCallback(true);
      const value = await nextValue(state.state$);
      expect(value.useRegistrationCallback).toBeTrue();
    });
  });

  describe('register(useCallback)', () => {
    let callback: jasmine.Spy<(json: string) => void>;
    let download: jasmine.Spy;
    let globals: jasmine.SpyObj<GlobalsService>;

    beforeEach(() => {
      callback = jasmine.createSpy();
      download = spyOn(FileSaver, 'saveAs');
      globals = TestBed.inject(GlobalsService) as jasmine.SpyObj<GlobalsService>;
      globals.get.and.returnValue(callback);

    });

    it('finds the callback from the global object', () => {
      state.register();
      expect(globals.get).toHaveBeenCalled();
    });

    it('uses the callback when useCallback argument is true', () => {
      state.register(true);
      expect(callback).toHaveBeenCalled();
    });

    it('uses download when useCallback argument is false', () => {
      state.register(false);
      expect(download).toHaveBeenCalled();
    });

    it('uses the callback if the state useRegistrationCallback is true and no argument is provided', () => {
      TestBed.inject(Store).reset({
        registration: {
          useRegistrationCallback: true
        }
      });

      state.register();
      expect(callback).toHaveBeenCalled();
    });

    it('uses download when the state useRegistrationCallback is false and no argument is provided', () => {
      state.register();
      expect(download).toHaveBeenCalled();
    });

    it('does nothing if there is no callback and the registration method is selected', () => {
      globals.get.and.returnValue(undefined);
      state.register(true);
      expect(callback).not.toHaveBeenCalled();
    });
  });
});
