import { Observable, lastValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';
import { Shallow } from 'shallow-render';

import { TextSearchComponent } from './text-search.component';
import { TextSearchModule } from './text-search.module';


function nextValue<T>(obs: Observable<T>): Promise<T> {
  return lastValueFrom(obs.pipe(take(1)));
}

describe('TextSearchComponent', () => {
  let autoCompleter: jasmine.Spy;
  let shallow: Shallow<TextSearchComponent>;

  beforeEach(() => {
    autoCompleter = jasmine.createSpy().and.returnValue([[]]);
    shallow = new Shallow(TextSearchComponent, TextSearchModule);
  });

  describe('.value', () => {
    it('has the same value as the form control', async () => {
      const { instance } = await shallow.render();
      instance.controller.setValue('abc');
      expect(instance.value).toEqual('abc');
    });

    it('sets the value on the form control', async () => {
      const { instance } = await shallow.render();
      instance.value = 'def';
      expect(instance.controller.value).toEqual('def');
    });
  });

  describe('.valueChange', () => {
    it('emits when the form control value changes', async () => {
      const { instance } = await shallow.render();
      const resultPromise = nextValue(instance.valueChange);
      instance.controller.setValue('oh');
      expect(await resultPromise).toEqual('oh');
    });
  });

  describe('.options', () => {
    it('emits an empty array if no autocompleter is provided', async () => {
      const { instance } = await shallow.render();
      const value = await nextValue(instance.options);
      expect(value).toEqual([]);
    });

    it('emits an empty array if maxOptions is less than 1', async () => {
      const { instance } = await shallow.render({ bind: { autoCompleter, maxOptions: 0 } });
      const value = await nextValue(instance.options);
      expect(value).toEqual([]);
    });

    it('calls the autocompleter with the search and max', async () => {
      const { instance } = await shallow.render({ bind: { autoCompleter, maxOptions: 1 } });
      await nextValue(instance.options);
      expect(autoCompleter).toHaveBeenCalledWith('', 1);
    });

    it('truncates the result if it is longer than maxOptions', async () => {
      const { instance } = await shallow.render({ bind: { autoCompleter, maxOptions: 1 } });
      autoCompleter.and.returnValue([[{}, {}]]);

      const value = await nextValue(instance.options);
      expect(value.length).toEqual(1);
    });
  });

  describe('optionDisplay(opt)', () => {
    it('returns the option label', async () => {
      const { instance } = await shallow.render();
      const result = instance.optionDisplay({ id: 1, label: 'foo' });
      expect(result).toEqual('foo');
    });

    it('returns the empty string for null', async () => {
      const { instance } = await shallow.render();
      const result = instance.optionDisplay(null);
      expect(result).toEqual('');
    });
  });

  describe('optionId(opt)', () => {
    it('returns the option identifier', async () => {
      const { instance } = await shallow.render();
      const result = instance.optionId(0, { id: 11, label: '' });
      expect(result).toEqual(11);
    });
  });
});
