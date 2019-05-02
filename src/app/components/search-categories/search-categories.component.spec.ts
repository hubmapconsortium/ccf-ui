import { DebugElement, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { SearchService } from '../../shared/services/search/search.service';
import { SearchCategoriesComponent } from './search-categories.component';
import { SearchCategoriesModule } from './search-categories.module';


describe('SearchCategoriesComponent', () => {
  let component: SearchCategoriesComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<SearchCategoriesComponent>;

  beforeEach(async () => {
    shallow = new Shallow(SearchCategoriesComponent, SearchCategoriesModule);
    ({ instance: component, get, find } = await shallow.render());
  });

  describe('component', () => {
    describe('ngOnChanges(changes)', () => {
      describe('when changes contains filterCategories', () => {
        const changes = { filterCategories: { } };
        beforeEach(() => {
          component.filterCategories = new Map([['Technologies', []]]);
          component.ngOnChanges(changes as any);
        });

        it('extracts keys as categories', () => {
          expect(component.categories).toEqual(['Technologies']);
        });
      });
    });

    function describeCategorySelected(
      category: string, method: string, addFilter = false
    ): void {
      describe(`selected(\'${category}\', filter)`, () => {
        const filter = 'afilter';
        let spy: jasmine.Spy;
        beforeEach(() => {
          spy = spyOn(get(SearchService), method as any);
          if (addFilter) {
            component.selectedFilterCategories.set(category, new Set([filter]));
          }
          component.selected(category, filter);
        });

        it(`calls ${method} on the SearchService`, () => {
          expect(spy).toHaveBeenCalledWith(filter);
        });
      });
    }

    describeCategorySelected('Technologies', 'selectTechnology');
    describeCategorySelected('Technologies', 'unselectTechnology', true);
    describeCategorySelected('TMCs', 'selectTMC');
    describeCategorySelected('TMCs', 'unselectTMC', true);

    describe('isSelected(category, filter)', () => {
      const existingCategory = 'Technologies';
      const existingFilter = 'abc';

      beforeEach(() => {
        const filters = new Set([existingFilter]);
        component.selectedFilterCategories.set(existingCategory, filters);
      });

      it('returns true when the category and filter are selected', () => {
        const result = component.isSelected(existingCategory, existingFilter);
        expect(result).toBeTruthy();
      });

      it('returns false when the category and filter are not selected', () => {
        const result = component.isSelected('TMC', 'def');
        expect(result).toBeFalsy();
      });
    });
  });

  describe('dom', () => {
    describe('Search Categories', () => {

      it('group exists', () => {
        expect(find('.search-category-group')).toBeTruthy();
      });

      it('tab exists', () => {
        expect(find('.tab')).toBeTruthy();
      });

      it('content exists', () => {
        expect(find('.search-criteria-content')).toBeTruthy();
      });
    });
  });
});
