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
      expect(searchState).toEqual(jasmine.objectContaining({ ageRange: [min, max] }));
    });
  });

  describe('selectTechnology(technology)', () => {
    const selectedTechnology = 'abc-tech';
    let searchState: any;

    beforeEach(async () => {
      service.selectTechnology(selectedTechnology);
      searchState = await store.selectOnce(SearchState).toPromise();
    });

    it('sets the selected technology in the search state', () => {
      expect(searchState.technologies).toEqual(jasmine.arrayContaining([selectedTechnology]));
    });
  });

  describe('selectTMC(tmc)', () => {
    const selectedTMC = 'abc-tmc';
    let searchState: any;

    beforeEach(async () => {
      service.selectTMC(selectedTMC);
      searchState = await store.selectOnce(SearchState).toPromise();
    });

    it('sets the selected technology in the search state', () => {
      expect(searchState.tmc).toEqual(jasmine.arrayContaining([selectedTMC]));
    });
  });

  describe('unselectTechnology(technology)', () => {
    const unselectedTechnology = 'abc-technology';
    let searchState: any;

    beforeEach(async () => {
      service.unselectTechnology(unselectedTechnology);
      searchState = await store.selectOnce(SearchState).toPromise();
    });

    it('unselects the selected technology in the search state', () => {
      expect(searchState.technologies).not.toEqual(jasmine.arrayContaining([unselectedTechnology]));
    });
  });

  describe('unselectTMC(tmc)', () => {
    const unselectedTMC = 'abc-tmc';
    let searchState: any;

    beforeEach(async () => {
      service.unselectTMC(unselectedTMC);
      searchState = await store.selectOnce(SearchState).toPromise();
    });

    it('unselects the selected tmc in the search state', () => {
      expect(searchState.technologies).not.toEqual(jasmine.arrayContaining([unselectedTMC]));
    });
  });
});
