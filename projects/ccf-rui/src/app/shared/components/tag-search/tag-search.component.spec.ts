import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Shallow } from 'shallow-render';

import { Tag, TagSearchResult } from '../../../core/models/anatomical-structure-tag';
import { TagSearchComponent } from './tag-search.component';
import { TagSearchModule } from './tag-search.module';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return obs.pipe(take(1)).toPromise();
}


describe('TagSearchComponent', () => {
  let shallow: Shallow<TagSearchComponent>;

  beforeEach(() => {
    shallow = new Shallow(TagSearchComponent, TagSearchModule)
      .import(NoopAnimationsModule)
      .dontMock(NoopAnimationsModule, MatFormFieldModule, MatInputModule, MatSelectModule);
  });

  describe('.search', () => {
    const simpleResult: TagSearchResult = {
      totalCount: 1,
      results: [{
        id: 1,
      } as Tag]
    };
    let search: jasmine.Spy<(text: string, limit: number) => TagSearchResult[]>;

    function doSearch(
      instance: TagSearchComponent,
      text: string,
      result: TagSearchResult = simpleResult
    ): Promise<TagSearchResult> {
      search.and.returnValue([result]);
      instance.searchController.setValue(text);
      return nextValue(instance.searchResult$);
    }

    beforeEach(() => {
      search = jasmine.createSpy('searcher');
    });

    it('calls the provided search function', async () => {
      const { instance } = await shallow.render({ bind: { search, searchLimit: 10 } });
      await doSearch(instance, 'foo');
      expect(search).toHaveBeenCalledWith('foo', 10);
    });

    it('limits the number of search results', async () => {
      const bigResult: TagSearchResult = {
        totalCount: 500,
        results: [
          { id: 1 },
          { id: 2 }
        ] as Tag[]
      };
      const { instance } = await shallow.render({ bind: { search, searchLimit: 1 } });
      const result = await doSearch(instance, 'foo', bigResult);
      expect(result.results.length).toEqual(1);
    });

    it('does not call search on empty search text', async () => {
      const { instance } = await shallow.render({ bind: { search } });
      await doSearch(instance, '');
      expect(search).not.toHaveBeenCalled();
    });

    it('returns an empty result if not provided', async () => {
      const { instance } = await shallow.render();
      const result = await doSearch(instance, 'bar');
      expect(result).toEqual({ totalCount: 0, results: [] });
    });
  });

  describe('tagId(index, tag)', () => {
    it('returns the tag identifier', async () => {
      const { instance } = await shallow.render();
      const id = instance.tagId(0, { id: 1 } as Tag);
      expect(id).toEqual(1);
    });
  });

  describe('emitTagsAndClear(searchEl)', () => {
    const tags = [{ id: 1 } as Tag];
    let focusable: jasmine.SpyObj<{ focus(): void }>;

    function setSelected(instance: TagSearchComponent, items: Tag[] = tags): void {
      const controller = instance.selectController;
      const selected = [...controller.value as unknown[], ...items];
      controller.setValue(selected);
    }

    beforeEach(() => {
      focusable = jasmine.createSpyObj<MatInput>('MatInput', ['focus']);
    });

    it('emits the selected tags', async () => {
      const { instance, outputs } = await shallow.render();
      setSelected(instance);
      instance.emitTagsAndClear(focusable);
      expect(outputs.added.emit).toHaveBeenCalledWith(tags);
    });

    it('focuses the provided element', async () => {
      const { instance } = await shallow.render();
      setSelected(instance);
      instance.emitTagsAndClear(focusable);
      expect(focusable.focus).toHaveBeenCalled();
    });

    it('clears the search', async () => {
      const { instance } = await shallow.render();
      const spy = spyOn(instance.searchController, 'setValue');
      setSelected(instance);
      instance.emitTagsAndClear(focusable);
      expect(spy).toHaveBeenCalledWith('');
    });

    it('does nothing if no tags are selected', async () => {
      const { instance, outputs } = await shallow.render();
      instance.emitTagsAndClear(focusable);
      expect(outputs.added.emit).not.toHaveBeenCalled();
    });
  });
});
