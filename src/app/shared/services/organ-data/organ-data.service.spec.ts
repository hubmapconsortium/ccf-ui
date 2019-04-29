import { Component, NgModule, Type } from '@angular/core';
import { Store } from '@ngxs/store';
import { set } from 'lodash';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Shallow } from 'shallow-render';

import { TissueSample } from '../../state/database/database.models';
import { OrganDataService } from './organ-data.service';


@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }


describe('OrganDataService', () => {
  const organ = { id: 'kidney' } as TissueSample;
  set(organ, 'metadata.label', 'info');
  set(organ, 'slice.sample.patient.anatomicalLocations[0]', 'kidney');

  let get: <T>(type: Type<T>) => T;
  let service: OrganDataService;
  let shallow: Shallow<TestComponent>;
  let store: Store;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .provide(OrganDataService)
      .dontMock(OrganDataService);

    ({ get } = await shallow.render());
    store = get(Store);
    service = get(OrganDataService);
  });

  beforeEach(() => store.reset({ navigation: { activeOrgan: organ } }));

  function describeStateSlice(
    methodName: 'getOrganSourcePath' | 'getAllTissueSamples',
    dataDescription: string,
    expected: any,
    arg?: string
  ): void {
    describe(`${methodName}()`, () => {
      let obs: Observable<any>;
      beforeEach(() => obs = service[methodName](arg));

      it('returns an observable', () => {
        expect(obs).toEqual(jasmine.any(Observable));
      });

      if (expected != null) {
        it(dataDescription, async () => {
          const result = await obs.pipe(take(1)).toPromise();
          expect(result.indexOf(expected)).not.toEqual(-1);
        });
      }
    });
  }

  describeStateSlice('getOrganSourcePath', 'emits the source path of the currently active organ', 'organ/kidney');
  describeStateSlice('getAllTissueSamples', 'emits all tissue samples of the organ', null, 'kidney');
});
