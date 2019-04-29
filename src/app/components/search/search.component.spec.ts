import { DebugElement, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { SearchComponent } from './search.component';
import { SearchModule } from './search.module';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<SearchComponent>;

  beforeEach(async () => {
    shallow = new Shallow(SearchComponent, SearchModule);
    ({ instance: component, get, find } = await shallow.render());
  });

  describe('component', () => {
    it('exists', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('dom', () => {
    describe('search-categories', () => {
      it('exists', () => {
        expect(find('.ccf-search-categories')).toBeTruthy();
      });
    });

    describe('age-selector', () => {
      it('age-selector exists', () => {
        expect(find('.age-selector')).toBeTruthy();
      });
    });
  });
});
