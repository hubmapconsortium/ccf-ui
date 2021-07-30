import { TestBed } from '@angular/core/testing';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { GLOBAL_CONFIG } from '../../services/config/config';
import { ModelState } from './../model/model.state';
import { PageState } from './page.state';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return obs.pipe(take(1)).toPromise();
}

describe('PageState', () => {
  let state: PageState;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([PageState, ModelState, GlobalConfigState])
      ],
      providers: [
        ModelState,
        GlobalConfigState,
        { provide: GLOBAL_CONFIG, useValue: {} }
      ]
    });

    TestBed.inject(Store).reset({
      page: {
        user: {
          firstName: 'Bob',
          lastName: 'the Dragon'
        },
        useCancelRegistrationCallback: false
      },
      globalConfig: {}
    });

    state = TestBed.inject(PageState);
    state.ngxsOnInit();
  });

  it('has the latest user', async () => {
    const value = await nextValue(state.user$);
    expect(value).toEqual({ firstName: 'Bob', lastName: 'the Dragon' });
  });

  it('updates user name', async () => {
    const newName = { firstName: 'Alice', lastName: 'the President' };
    state.setUserName(newName);

    const value = await nextValue(state.user$);
    expect(value).toEqual(jasmine.objectContaining(newName));
  });

  it('updates registrationStarted', async () => {
    state.registrationStarted();
    const value = await nextValue(state.registrationStarted$);
    expect(value).toBeTrue();
  });

  it('updates useCancelRegistrationCallback', async () => {
    state.setUseCancelRegistrationCallback(true);
    const value = await nextValue(state.useCancelRegistrationCallback$);
    expect(value).toBeTrue();
  });
});
