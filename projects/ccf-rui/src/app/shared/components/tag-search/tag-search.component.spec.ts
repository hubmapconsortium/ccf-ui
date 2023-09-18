import { NgZone } from '@angular/core';
import { Observable, ReplaySubject, Subscription, lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { Shallow } from 'shallow-render';

import { Tag, TagSearchResult } from '../../../core/models/anatomical-structure-tag';
import { TagSearchComponent } from './tag-search.component';
import { TagSearchModule } from './tag-search.module';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return lastValueFrom(obs.pipe(take(1)));
}

function delay(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}


describe('TagSearchComponent', () => {
  const defaultInputs = {
    placeholder: 'placeholder',
    searchLimit: 2,
    searchThrottle: 1
  };

  let shallow: Shallow<TagSearchComponent>;

  beforeEach(() => {
    shallow = new Shallow(TagSearchComponent, TagSearchModule);
  });

  describe('search', () => {
    type PromiseResult<T> = T extends Promise<infer U> ? U : T;
    type SearcherType = NonNullable<TagSearchComponent['search']>;

    let searcher: jasmine.Spy<SearcherType>;
    let results: ReplaySubject<TagSearchResult>;
    let errorCount: number;
    let rendering: PromiseResult<ReturnType<Shallow<TagSearchComponent>['render']>>;
    let instance: TagSearchComponent;
    let inject: (typeof rendering)['inject'];
    let zone: NgZone;
    let subs: Subscription;

    async function setInputValue(val: string): Promise<void> {
      rendering.instance.searchControl.setValue(val);
      await delay((rendering.instance.searchThrottle ?? 100) + 10);
    }

    async function zoneStable(): Promise<void> {
      if (!zone.isStable) {
        await nextValue(zone.onStable);
      }
    }

    beforeEach(async () => {
      results = new ReplaySubject(1);
      searcher = jasmine.createSpy<SearcherType>().and.returnValue(results);
      errorCount = 0;
      subs = new Subscription();

      rendering = await shallow.render({
        bind: {
          ...defaultInputs, search: searcher
        }
      });

      instance = rendering.instance;
      inject = rendering.inject;
      zone = inject(NgZone);

      subs.add(zone.onError.subscribe(() => {
        errorCount++;
      }));
    });

    afterEach(() => {
      subs.unsubscribe();
    });

    it('calls the search function when the input changes', async () => {
      await setInputValue('abc');
      expect(searcher).toHaveBeenCalledWith('abc', defaultInputs.searchLimit);
    });

    it('does not call the search function on empty inputs', async () => {
      await setInputValue('');
      expect(searcher).not.toHaveBeenCalled();
    });

    it('does nothing with an undefined search function', async () => {
      instance.search = undefined;
      await setInputValue('def');
      await zoneStable();
      expect(errorCount).toEqual(0);
    });

    it('provides a default search limit if not provided', async () => {
      instance.searchLimit = undefined;
      await setInputValue('q');
      expect(searcher).toHaveBeenCalledWith('q', jasmine.any(Number));
    });

    it('truncate results if to many items are returned', async () => {
      const res = { totalCount: 1, results: [{}, {}, {}] as Tag[] };
      instance.searchLimit = 1;
      results.next(res);
      await setInputValue('w');
      expect(instance.searchResults.results.length).toEqual(1);
    });

    it('does not truncate results if within limits', async () => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const res = { totalCount: 1, results: [{} as Tag] };
      instance.searchLimit = undefined;
      results.next(res);
      await setInputValue('a');
      expect(instance.searchResults.results.length).toEqual(1);
    });

    it('throttles calls to the search', async () => {
      const control = instance.searchControl;
      instance.searchThrottle = 10;
      control.setValue('a');
      control.setValue('b');
      control.setValue('c');

      await delay(1);
      expect(searcher).toHaveBeenCalledTimes(1);
      await delay(20);
      expect(searcher).toHaveBeenCalledTimes(2);
    });
  });

  describe('tagId(_, tag)', () => {
    it('returns the tag\'s identifier', async () => {
      const { instance } = await shallow.render();
      const res = instance.tagId(0, { id: 'foo' } as Tag);
      expect(res).toEqual('foo');
    });
  });

  describe('hasCheckedTags', () => {
    it('returns false if there are no truthy values in checkedResults', async () => {
      const { instance } = await shallow.render();
      instance.checkedResults = { foo: false };
      expect(instance.hasCheckedTags()).toBeFalse();
    });

    it('returns true if there is at least on truthy value in checkedResults', async () => {
      const { instance } = await shallow.render();
      instance.checkedResults = { bar: true, foo: false };
      expect(instance.hasCheckedTags()).toBeTrue();
    });
  });

  describe('addTags()', () => {
    const tag: Tag = { id: 'foo', label: 'bar', type: 'added' };

    function setTags(instance: TagSearchComponent): void {
      instance.searchResults = { totalCount: 1, results: [tag] };
      instance.checkedResults = { foo: true };
    }

    it('does nothing if no tags are selected', async () => {
      const { instance, outputs } = await shallow.render();
      instance.checkedResults = { foo: false };
      instance.addTags();
      expect(outputs.added.emit).not.toHaveBeenCalled();
    });

    it('resets the search input', async () => {
      const { instance } = await shallow.render();
      const spy = spyOn(instance.searchControl, 'reset');
      setTags(instance);
      instance.addTags();
      expect(spy).toHaveBeenCalled();
    });

    it('resets search results', async () => {
      const { instance } = await shallow.render();
      setTags(instance);
      instance.addTags();
      expect(instance.searchResults).toEqual({ totalCount: 0, results: [] });
    });

    it('resets checked tags', async () => {
      const { instance } = await shallow.render();
      setTags(instance);
      instance.addTags();
      expect(instance.checkedResults).toEqual({});
    });

    it('emits selected tags', async () => {
      const { instance, outputs } = await shallow.render();
      setTags(instance);
      instance.addTags();
      expect(outputs.added.emit).toHaveBeenCalledWith([tag]);
    });
  });

  describe('openResults()', () => {
    it('set resultsVisible to true', async () => {
      const { instance } = await shallow.render();
      instance.resultsVisible = false;
      instance.openResults();
      expect(instance.resultsVisible).toBeTrue();
    });
  });

  describe('closeResults(event)', () => {
    it('sets resultsVisible to false if the event is outside the component', async () => {
      const { instance } = await shallow.render();
      instance.resultsVisible = true;
      instance.closeResults({ target: document } as unknown as Event);
      expect(instance.resultsVisible).toBeFalse();
    });

    it('does nothing if the event is inside the component', async () => {
      const { instance, find } = await shallow.render();
      instance.resultsVisible = true;
      instance.closeResults({ target: find('.search-box') } as unknown as Event);
      expect(instance.resultsVisible).toBeTrue();
    });

    it('does nothing if the event target is not a HTML node', async () => {
      const { instance } = await shallow.render();
      instance.resultsVisible = true;
      instance.closeResults({} as Event);
      expect(instance.resultsVisible).toBeTrue();
    });
  });
});
