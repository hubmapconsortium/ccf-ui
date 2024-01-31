import { GlobalsService, GlobalThis } from './globals.service';


class TestGlobalsService extends GlobalsService {
  constructor(readonly globals?: Record<string, unknown>) {
    super();
  }

  override findGlobalObject(): GlobalThis | undefined {
    return this.globals as GlobalThis | undefined;
  }
}

describe('GlobalsService', () => {
  let globals: GlobalsService;
  let noGlobals: GlobalsService;
  let frozenGlobals: GlobalsService;

  beforeEach(() => {
    globals = new TestGlobalsService({ a: 1, b: null });
    noGlobals = new TestGlobalsService();
    frozenGlobals = new TestGlobalsService(Object.freeze({ a: 1, b: null }));
  });

  describe('.obj', () => {
    it('exposes the global object', () => {
      expect(globals.obj).toBeDefined();
    });
  });

  describe('.has(key)', () => {
    it('returns true if the key exist', () => {
      expect(globals.has('a')).toBeTrue();
    });

    it('returns true even when the value is undefined or null', () => {
      expect(globals.has('b')).toBeTrue();
    });

    it('returns false if the key does not exist', () => {
      expect(globals.has('c')).toBeFalse();
    });

    it('returns false if there is no global object', () => {
      expect(noGlobals.has('c')).toBeFalse();
    });
  });

  describe('.get(key, default)', () => {
    it('returns the value if it exists', () => {
      expect(globals.get<number>('a')).toEqual(1);
    });

    it('returns the default if the value does not exist', () => {
      expect(globals.get('c', 2)).toEqual(2);
    });

    it('returns the default if the value is undefined or null', () => {
      expect(globals.get('b', 2)).toEqual(2);
    });

    it('returns the default if no global object exists', () => {
      expect(noGlobals.get('a', 2)).toEqual(2);
    });

    it('returns undefined if the value does not exist and no default is provided', () => {
      expect(globals.get('c')).toBeUndefined();
    });
  });

  describe('.set(key, value)', () => {
    it('adds a new value if the key does not exist', () => {
      globals.set('foo', 3);
      expect(globals.obj).toEqual(jasmine.objectContaining({ foo: 3 }));
    });

    it('updates the current value', () => {
      globals.set('a', 3);
      expect(globals.obj).toEqual(jasmine.objectContaining({ a: 3 }));
    });

    it('has no effect if there is no global object', () => {
      expect(() => noGlobals.set('b', 3)).not.toThrow();
    });

    it('throws when attempting to set a readonly value', () => {
      expect(() => frozenGlobals.set('a', 3)).toThrow();
    });
  });

  describe('.remove(key)', () => {
    it('removes the key if it exists', () => {
      globals.remove('a');
      expect(globals.obj).not.toEqual(jasmine.objectContaining({ a: 1 }));
    });

    it('has no effect if there is no global object', () => {
      expect(() => noGlobals.remove('a')).not.toThrow();
    });

    it('throws if the key is unremovable', () => {
      expect(() => frozenGlobals.remove('a')).toThrow();
    });
  });
});
