import { Store, DataFactory, Quad } from 'n3';

import { serializeN3Store, deserializeN3Store } from './triple-store-serialization';


function quad(subject: string, predicate: string, object: string): Quad {
  return DataFactory.quad(
    DataFactory.namedNode(subject),
    DataFactory.namedNode(predicate),
    DataFactory.namedNode(object)
  );
}

describe('triple-store-serialization', () => {
  describe('serializeN3Store(store)', () => {
    let store: Store;

    beforeEach(() => {
      store = new Store(undefined, {factory: DataFactory});
      store.addQuads([
        quad('sub1', 'thing', 'sub2')
      ]);
    });

    it('serializes a store', () => {
      const storeString = serializeN3Store(store);
      expect(storeString.length > 0).toBeTruthy();
    });
  });

  describe('deserializeN3Store(store)', () => {
    let store: Store;
    let storeQuads: Quad[];

    beforeEach(() => {
      store = new Store(undefined, {factory: DataFactory});
      store.addQuads([
        quad('sub1', 'thing', 'sub2')
      ]);
      storeQuads = store.getQuads(null, null, null, null);
    });

    it('it deserializes a store', () => {
      const storeString = serializeN3Store(store);
      const restored = deserializeN3Store(storeString);
      const restoredQuads = restored.getQuads(null, null, null, null);

      expect(store.size === restored.size).toBeTruthy();
      expect(storeQuads.length === restoredQuads.length).toBeTruthy();
    });

    it('it reserializes to the same as input string', () => {
      const storeString = serializeN3Store(store);
      const restored = deserializeN3Store(storeString);
      const restoredString = serializeN3Store(restored);

      expect(storeString.length === restoredString.length).toBeTruthy();
    });
  });
});
