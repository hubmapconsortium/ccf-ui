import { Component, NgModule, Type } from '@angular/core';
import { Store } from '@ngxs/store';
import { Shallow } from 'shallow-render';

import { SearchState } from '../../state/search/search.state';
import { SearchService } from './search.service';

@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('SearchService', () => {
  let get: <T>(type: Type<T>) => T;
  let service: SearchService;
  let shallow: Shallow<TestComponent>;
  let store: Store;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .dontMock(SearchService);

    ({ get } = await shallow.render());
    store = get(Store);
    service = get(SearchService);
  });

  describe('setAgeRange(min, max)', () => {
    const min = 123;
    const max = 456;
    let searchState: any;

    beforeEach(async () => {
      service.setAgeRange(min, max);
      searchState = await store.selectOnce(SearchState).toPromise();
    });

    it('sets the age range in the search state', () => {
      expect(searchState.ageRange).toEqual([min, max]);
    });
  });

  describe('setGender(gender)', () => {
    const gender = 'female';
    let searchState: any;

    beforeEach(async () => {
      service.setGender(gender);
      searchState = await store.selectOnce(SearchState).toPromise();
    });

    it('sets the gender in the search state', () => {
      expect(searchState.gender).toEqual(gender);
    });
  });
});
