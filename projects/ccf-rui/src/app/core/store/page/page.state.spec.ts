import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';
import { lastValueFrom, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { GLOBAL_CONFIG } from '../../services/config/config';
import { AnatomicalStructureTagState } from '../anatomical-structure-tags/anatomical-structure-tags.state';
import { ReferenceDataState } from '../reference-data/reference-data.state';
import { ModelState } from './../model/model.state';
import { PageState } from './page.state';
import { RegistrationState } from '../registration/registration.state';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return lastValueFrom(obs.pipe(take(1)));
}

describe('PageState', () => {
  let state: PageState;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([PageState, ModelState, AnatomicalStructureTagState, GlobalConfigState])
      ],
      providers: [
        ModelState,
        ReferenceDataState,
        {
          provide: AnatomicalStructureTagState, useValue: {
            tags$: of([])
          }
        },
        GlobalConfigState,
        { provide: GLOBAL_CONFIG, useValue: {} },
        {
          provide: RegistrationState, useValue: {
            state$: of([])
          }
        }
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
      globalConfig: {
        skipUnsavedChangesConfirmation: true
      }
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

  it('sets orcid', async () => {
    const newOrcid = '1111-1111-1111-1111';
    state.setOrcidId(newOrcid);

    const value = await nextValue(state.user$);
    expect(value.orcidId).toEqual('https://orcid.org/' + newOrcid);
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
