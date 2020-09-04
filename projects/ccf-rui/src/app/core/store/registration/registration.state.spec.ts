import { TestBed } from '@angular/core/testing';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { RegistrationState } from './registration.state';
import { PageState, PageStateModel } from '../page/page.state';
import { ModelState, ModelStateModel } from '../model/model.state';


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

    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([RegistrationState])
      ],
      providers: [
        { provide: PageState, useValue: { state$: pageStateSubject } },
        { provide: ModelState, useValue: { state$: modelStateSubject } }
      ]
    });

    TestBed.inject(Store).reset({
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
});
