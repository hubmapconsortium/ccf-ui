import { NgxsDataPluginModule } from '@angular-ru/ngxs';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { GlobalConfigState } from 'ccf-shared';
import { Observable, lastValueFrom, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageState } from '../page/page.state';
import { ReferenceDataState } from '../reference-data/reference-data.state';
import { RegistrationState } from '../registration/registration.state';
import { GLOBAL_CONFIG } from './../../services/config/config';
import { ModelState } from './../model/model.state';
import { SceneState } from './../scene/scene.state';
import { AnatomicalStructureTagState } from './anatomical-structure-tags.state';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return lastValueFrom(obs.pipe(take(1)));
}

describe('AnatomicalStructureTagsState', () => {
  let state: AnatomicalStructureTagState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([AnatomicalStructureTagState, SceneState, ModelState, GlobalConfigState])
      ],
      providers: [
        AnatomicalStructureTagState,
        RegistrationState,
        SceneState,
        {
          provide: ModelState,
          useValue: {
            modelChanged$: of([])
          }
        },
        ReferenceDataState,
        GlobalConfigState,
        {
          provide: GLOBAL_CONFIG,
          useValue: {}
        },
        {
          provide: PageState,
          useValue: {
            setHasChanges: () => undefined
          }
        }
      ]
    });

    TestBed.inject(Store).reset({
      tags: {
        ids: [1],
        entities: {
          /* eslint-disable-next-line @typescript-eslint/naming-convention */
          1: {
            id: 1,
            label: 'foo',
            type: 'assigned'
          }
        }
      },
      globalConfig: {}
    });

    state = TestBed.inject(AnatomicalStructureTagState);
  });

  it('has the latest tags', async () => {
    const value = Object.values(await nextValue(state.entities$));
    expect(value).toEqual([{ id: 1, label: 'foo', type: 'assigned' }]);
  });
});
