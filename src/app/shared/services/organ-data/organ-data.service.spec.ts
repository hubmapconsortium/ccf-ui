import { Component, NgModule, Type } from '@angular/core';
import { Store } from '@ngxs/store';
import { set } from 'lodash';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Shallow } from 'shallow-render';

import { FilterBuilder } from '../../common/filter/filter-builder';
import { TissueSample } from '../../state/database/database.models';
import { LocalDatabaseService } from '../database/local/local-database.service';
import { CountMetadata, OrganDataService } from './organ-data.service';


@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }


describe('OrganDataService', () => {
  const organ = { id: 'kidney' } as TissueSample;
  set(organ, 'metadata.label', 'info');
  set(organ, 'patient.anatomicalLocations[0]', 'kidney');

  let get: <T>(type: Type<T>) => T;
  let service: OrganDataService;
  let shallow: Shallow<TestComponent>;
  let store: Store;

  function invokeWithThenReturn<T, R>(value: T, result: R): (fun: (value: T) => any) => R {
    return fun => {
      fun(value);
      return result;
    };
  }

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .provide(OrganDataService)
      .dontMock(OrganDataService);

    ({ get } = await shallow.render());
    store = get(Store);
    service = get(OrganDataService);

    store.reset({ navigation: { activeOrgan: organ } });
  });

  describe('organImagePath', () => {
    it('emits values based on the active path', async () => {
      const value = await service.organImagePath.pipe(take(1)).toPromise();
      expect(value).toContain(organ.id);
    });
  });

  describe('organOverlays', () => {
    let spy: jasmine.Spy;
    let value: any[];

    beforeEach(async () => {
      spyOn(store, 'select').and.callFake(() => of(new FilterBuilder()));
      spy = spyOn(get(LocalDatabaseService), 'getTissueSamples');
      spy.and.callFake(invokeWithThenReturn(organ, [[]]));
      value = await service.organOverlays.pipe(take(1)).toPromise();
    });

    it('queries the database for overlays', async () => {
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('getCounts', () => {
    let sliceSpy: jasmine.Spy;
    let imageSpy: jasmine.Spy;
    let value: CountMetadata;

    beforeEach(async () => {
      spyOn(store, 'select').and.callFake(() => of(new FilterBuilder()));
      sliceSpy = spyOn(get(LocalDatabaseService), 'getTissueSlices');
      sliceSpy.and.callFake(invokeWithThenReturn({ sample: organ }, [[]]));
      imageSpy = spyOn(get(LocalDatabaseService), 'getTissueImages');
      imageSpy.and.callFake(invokeWithThenReturn(set({}, 'slice.sample', organ), [[]]));

      value = await service.getCounts(organ).pipe(take(1)).toPromise();
    });

    it('emits object with the counts', () => {
      const countLike: any = {
        patients: jasmine.any(Number),
        tissueSamples: jasmine.any(Number),
        tissueSlices: jasmine.any(Number),
        tissueImages: jasmine.any(Number),
        cells: jasmine.any(Number)
      };
      expect(value).toEqual(jasmine.objectContaining(countLike));
    });

    it('subsequent calls with the same arguments returns the same observable', () => {
      const obs1 = service.getCounts(organ);
      const obs2 = service.getCounts(organ);

      expect(obs1).toBe(obs2);
    });
  });
});
