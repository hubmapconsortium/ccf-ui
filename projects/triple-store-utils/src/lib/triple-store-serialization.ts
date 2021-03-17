import { Store, DataFactory } from 'n3';
import * as RDF from 'rdf-js';

export function serializeN3Store(store: Store): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  store.size; // this causes the store to compute the size before we serialize it
  const storeData = Object.assign({} as Record<string, unknown>, store);
  // eslint-disable-next-line no-underscore-dangle
  delete storeData._factory;
  return JSON.stringify(storeData);
}

export function deserializeN3Store(serializedStore: string, factory?: RDF.DataFactory): Store {
  const storeData = JSON.parse(serializedStore);
  const store = new Store();
  Object.assign(store, storeData, {_factory: factory || DataFactory});
  return store;
}
