import { DebugElement, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { SearchComponent } from './search.component';
import { SearchModule } from './search.module';
import { MatTooltipModule } from '@angular/material';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<SearchComponent>;

  beforeEach(async () => {
    shallow = new Shallow(SearchComponent, SearchModule)
      .dontMock(MatTooltipModule);
    ({ instance: component, get, find } = await shallow.render());
  });

  function exists(className: string) {
    describe(className, () => {
      it('exists', () => {
        expect(find('.' + className)).toBeTruthy();
      });
    });
  }

  describe('component', () => {
    it('exists', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('dom', () => {
    exists('age-selector');
    exists('search-categories');
  });
});
