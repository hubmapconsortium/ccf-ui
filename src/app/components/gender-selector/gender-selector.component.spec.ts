import { DebugElement, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { SearchService } from '../../shared/services/search/search.service';
import { GenderSelectorComponent } from './gender-selector.component';
import { GenderSelectorModule } from './gender-selector.module';

describe('GenderSelectorComponent', () => {
  let component: GenderSelectorComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<GenderSelectorComponent>;

  beforeEach(async () => {
    shallow = new Shallow(GenderSelectorComponent, GenderSelectorModule);

    ({ instance: component, get, find } = await shallow.render());
  });

  describe('component', () => {
    describe('selectionChanged(value)', () => {
      let spy: jasmine.Spy;
      beforeEach(() => spy = spyOn(get(SearchService), 'setGender'));

      it('sets the state using SearchService', () => {
        component.selectionChanged('female');
        expect(spy).toHaveBeenCalled();
      });

      it('sets the gender to undefined when value === \'male-female\'', () => {
        component.selectionChanged('male-female');
        expect(spy).toHaveBeenCalledWith(undefined);
      });
    });
  });

  describe('dom', () => {
    describe('toggle-group', () => {
      it('exists', () => {
        expect(find('.group')).toBeTruthy();
      });

      it('contains three buttons', () => {
        const buttons = find('.toggle');
        expect(buttons).toBeTruthy();
        expect(buttons.length).toEqual(3);
      });
    });
  });
});
