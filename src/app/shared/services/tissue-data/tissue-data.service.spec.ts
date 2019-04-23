import { Component, NgModule, Type } from '@angular/core';
import { Store } from '@ngxs/store';
import { set } from 'lodash';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Shallow } from 'shallow-render';

import { TissueImage } from '../../state/database/database.models';
import { TissueDataService } from './tissue-data.service';

@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('TissueDataService', () => {
  const tissue = { tileUrl: 'fake' } as TissueImage;
  set(tissue, 'metadata.label', 'info');
  set(tissue, 'slice.sample.patient.anatomicalLocations[0]', 'heart');

  let get: <T>(type: Type<T>) => T;
  let service: TissueDataService;
  let shallow: Shallow<TestComponent>;
  let store: Store;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .provide(TissueDataService)
      .dontMock(TissueDataService);

    ({ get } = await shallow.render());
    store = get(Store);
    service = get(TissueDataService);
  });

  beforeEach(() => store.reset({ navigation: { activeTissue: tissue } }));

  function describeStateSlice(
    methodName: 'getTissueSourcePath' | 'getMetadata' | 'getOrganName',
    dataDescription: string, expected: any
  ): void {
    describe(`${methodName}()`, () => {
      let obs: Observable<any>;
      beforeEach(() => obs = service[methodName]());

      it('returns an observable', () => {
        expect(obs).toEqual(jasmine.any(Observable));
      });

      it(dataDescription, async () => {
        const result = await obs.pipe(take(1)).toPromise();
        expect(result).toEqual(expected);
      });
    });
  }

  describeStateSlice('getTissueSourcePath', 'emits the tile url of the currently active tissue', tissue.tileUrl);
  describeStateSlice('getMetadata', 'emits the metadata of the currently active tissue', tissue.metadata);
  describeStateSlice(
    'getOrganName', 'emits the name of the currently active organ',
    tissue.slice.sample.patient.anatomicalLocations[0]
  );
});
