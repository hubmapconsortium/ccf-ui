import { TestBed } from '@angular/core/testing';
import { NgxsDataPluginModule } from '@ngxs-labs/data';
import { NgxsModule, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ModelState } from './../model/model.state';
import { SceneState } from './../scene/scene.state';
import { AnatomicalStructureTagState } from './anatomical-structure-tags.state';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return obs.pipe(take(1)).toPromise();
}

describe('AnatomicalStructureTagsState', () => {
  let state: AnatomicalStructureTagState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsDataPluginModule.forRoot(),
        NgxsModule.forRoot([AnatomicalStructureTagState, SceneState, ModelState])
      ],
      providers: [
        AnatomicalStructureTagState, SceneState, ModelState
      ]
    });

    TestBed.inject(Store).reset({
      tags: {
        ids: [1],
        entities: {
          1: {
            id: 1,
            label: 'foo',
            type: 'assigned'
          }
        }
      }
    });

    state = TestBed.inject(AnatomicalStructureTagState);
  });

  it('has the latest tags', async () => {
    const value = Object.values(await nextValue(state.entities$));
    expect(value).toEqual([{ id: 1, label: 'foo', type: 'assigned' }]);
  });
});
