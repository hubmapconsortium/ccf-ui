import { EventEmitter } from 'events';
import { Sink } from 'rdf-js';
import { Readable } from 'readable-stream';

import { addJsonLdToStore, addRdfXmlToStore, arrayToStream, streamToArray } from './triple-store-utils';


type Store = Sink<EventEmitter, EventEmitter>;

function getGlobalThis(): typeof globalThis {
  if (typeof globalThis === 'object') {
    return globalThis;
  } else if (typeof window === 'object') {
    return window;
  } else if (typeof global === 'object') {
    return global as unknown as typeof globalThis;
  } else {
    return Function('return this;')() as typeof globalThis;
  }
}

describe('triple-store-utils', () => {
  describe('streamToArray(stream)', () => {
    let stream: jasmine.SpyObj<EventEmitter>;
    let result: Promise<unknown[]>;

    function findListener(method: 'on' | 'once', event: string): ((...args: unknown[]) => void) | undefined {
      const spy = stream[method];
      const calls = spy.calls.all();
      for (const call of calls) {
        if (call.args[0] === event) {
          return call.args[1];
        }
      }
      return undefined;
    }

    function callListener(method: 'on' | 'once', event: string, ...args: unknown[]): void {
      const listener = findListener(method, event);
      if (listener) { listener(...args); }
    }

    function next(value: unknown): void {
      callListener('on', 'data', value);
    }

    function complete(): void {
      callListener('once', 'end');
    }

    function error(err: unknown): void {
      callListener('once', 'error', err);
    }

    beforeEach(() => {
      stream = jasmine.createSpyObj<EventEmitter>('TestEmitter', ['on', 'once']);
      stream.on.and.returnValue(stream);
      stream.once.and.returnValue(stream);

      result = streamToArray(stream);
    });

    it('adds a data listener', () => {
      expect(findListener('on', 'data')).toBeInstanceOf(Function);
    });

    it('adds a completion listener', () => {
      expect(findListener('once', 'end')).toBeInstanceOf(Function);
    });

    it('adds an error listener', () => {
      expect(findListener('once', 'error')).toBeInstanceOf(Function);
    });

    it('resolves on stream completion', async () => {
      complete();
      expect(await result).toBeTruthy();
    });

    it('resolves with the stream values as an array', async () => {
      next(1);
      next(2);
      complete();
      expect(await result).toEqual([1, 2]);
    });

    it('rejects on stream error', async () => {
      let err: unknown;

      error('abc');
      try {
        await result;
      } catch (e) {
        err = e;
      }

      expect(err).toEqual('abc');
    });
  });

  describe('arrayToStream(array)', () => {
    const values = [1, 2, 3];
    let stream: Readable;

    beforeEach(() => {
      stream = arrayToStream(values);
    });

    it('reads values from the array', () => {
      expect(stream.read()).toEqual(values[0]);
    });

    it('completes after all values have been read', () => {
      for (const _unused of values) { stream.read(); }
      expect(stream.read()).toBeNull();
    });
  });

  describe('addJsonLdToStore(uri, store)', () => {
    const uri = 'test-uri';
    let fetchSpy: jasmine.Spy<typeof fetch>;
    let responseSpy: jasmine.SpyObj<Response>;
    let storeSpy: jasmine.SpyObj<Store>;

    beforeEach(async () => {
      fetchSpy = spyOn(getGlobalThis(), 'fetch');
      responseSpy = jasmine.createSpyObj<Response>('Response', ['json']);
      storeSpy = jasmine.createSpyObj<Store>('Store', ['import']);

      fetchSpy.and.resolveTo(responseSpy);
      responseSpy.json.and.resolveTo({});

      await addJsonLdToStore(uri, storeSpy);
    });

    it('fetches data from the uri', () => {
      expect(fetchSpy).toHaveBeenCalledWith(uri, jasmine.anything());
      expect(responseSpy.json).toHaveBeenCalled();
    });

    it('adds data to the store', () => {
      expect(storeSpy.import).toHaveBeenCalled();
    });
  });

  describe('addJsonLdToStore(json, store)', () => {
    let storeSpy: jasmine.SpyObj<Store>;

    beforeEach(async () => {
      storeSpy = jasmine.createSpyObj<Store>('Store', ['import']);

      await addJsonLdToStore({}, storeSpy);
    });

    it('adds data to the store', () => {
      expect(storeSpy.import).toHaveBeenCalled();
    });
  });

  describe('addRdfXmlToStore(uri, store)', () => {
    const uri = 'test-uri';
    let fetchSpy: jasmine.Spy<typeof fetch>;
    let responseSpy: jasmine.SpyObj<Response>;
    let storeSpy: jasmine.SpyObj<Store>;

    beforeEach(async () => {
      fetchSpy = spyOn(getGlobalThis(), 'fetch');
      responseSpy = jasmine.createSpyObj<Response>('Response', ['text']);
      storeSpy = jasmine.createSpyObj<Store>('Store', ['import']);

      fetchSpy.and.resolveTo(responseSpy);
      responseSpy.text.and.resolveTo('');
      storeSpy.import.and.callFake(stream => stream.on('data', () => undefined));

      await addRdfXmlToStore(uri, storeSpy);
    });

    it('fetches data from the uri', () => {
      expect(fetchSpy).toHaveBeenCalledWith(uri, jasmine.anything());
      expect(responseSpy.text).toHaveBeenCalled();
    });

    it('adds data to the store', () => {
      expect(storeSpy.import).toHaveBeenCalled();
    });
  });
});
