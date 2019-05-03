import { Component, NgModule, Type } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { set } from 'lodash';
import { Shallow } from 'shallow-render';

import { TissueImage } from '../database/database.models';
import {
  SelectTechnology,
  SelectTMC,
  SetAgeRangeFilter,
  SetGenderFilter,
  UnselectTechnology,
  UnselectTMC,
} from './search.action';
import { SearchStateModel } from './search.model';
import { SearchState } from './search.state';

@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('SearchState', () => {
  let ctx: { [K in (keyof StateContext<any>)]: jasmine.Spy };
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<TestComponent>;
  let state: SearchState;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .dontMock(SearchState);

    ({ get } = await shallow.render());
    state = get(SearchState);

    const initialState = { ageRange: [undefined, undefined], tmc: [], technologies: [] };
    ctx = jasmine.createSpyObj('context', ['dispatch', 'patchState', 'setState', 'getState']);
    ctx.getState.and.returnValue(initialState);
  });

  describe('actions', () => {
    function describeSimpleAction(method: string, description: string, action: any, partial: object): void {
      describe(method, () => {
        beforeEach(() => state[method](ctx, action));
        it(description, () => {
          expect(ctx.patchState).toHaveBeenCalledWith(jasmine.objectContaining(partial));
        });
      });
    }

    describeSimpleAction('setGender', 'sets the gender', new SetGenderFilter('female'), { gender: 'female' });
    describeSimpleAction('setAgeRange', 'sets the age range', new SetAgeRangeFilter(1, 2), { ageRange: [1, 2] });
    describeSimpleAction('addTMC', 'adds to the tmc array', new SelectTMC('abc'), { tmc: ['abc'] });
    describeSimpleAction('removeTMC', 'removes from the tmc array', new UnselectTMC('abc'), { tmc: [] });
    describeSimpleAction('addTechnology', 'adds to the technology array', new SelectTechnology('123'), { technologies: ['123'] });
    describeSimpleAction('removeTechnology', 'removes from the technology array', new UnselectTechnology('123'), { technologies: [] });
  });

  describe('selectors', () => {
    describe('tissueFilterBuilder(state)', () => {
      function createTissueImage(gender: string, age: number, tmc: string, technology: string): TissueImage {
        const patient = { age, gender, provider: tmc };
        const tissue = { technology };
        set(tissue, 'slice.sample.patient', patient);

        return tissue as TissueImage;
      }

      const searchState: SearchStateModel = { gender: 'female', ageRange: [10, 20], tmc: ['abc'], technologies: ['123'] };
      const filter = SearchState.tissueFilterBuilder(searchState).toFilter();
      const validItem = createTissueImage('female', 12, 'abc', '123');
      const invalidGenderItem = createTissueImage('male', 12, 'abc', '123');
      const invalidAgeItem = createTissueImage('female', 1000, 'abc', '123');
      const invalidTmcItem = createTissueImage('female', 12, 'def', '123');
      const invalidTechItem = createTissueImage('female', 12, 'abc', '456');

      it('filter returns true on matching items', () => {
        expect(filter(validItem)).toBeTruthy();
      });

      it('filters on gender', () => {
        expect(filter(invalidGenderItem)).toBeFalsy();
      });

      it('filters on age', () => {
        expect(filter(invalidAgeItem)).toBeFalsy();
      });

      it('filters on tmc/provider', () => {
        expect(filter(invalidTmcItem)).toBeFalsy();
      });

      it('filters on technology', () => {
        expect(filter(invalidTechItem)).toBeFalsy();
      });
    });
  });
});
