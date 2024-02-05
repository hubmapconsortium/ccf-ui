import { fromRdf } from 'rdf-literal';
import { Store, readQuads } from 'triple-store-utils';

/**
 * Iterates over the key/value pairs for an IRI, using the specified mapping with quads from the store.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @param mapping Property mappings.
 * @returns an iterator over the key/value pairs
 */
export function* getEntries(
  store: Store,
  iri: string,
  mapping: { [iri: string]: string }
): Generator<[string, string | number]> {
  for (const [predicate, key] of Object.entries(mapping)) {
    for (const quad of readQuads(store, iri, predicate, null, null)) {
      const value =
        quad.object.termType === 'Literal'
          ? fromRdf(quad.object)
          : quad.object.id;
      yield [key, value];
    }
  }
}

/**
 * Creates an object of the specified type using quads from the store.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @param type Type name.
 * @param mapping Property mappings.
 * @returns A new data object.
 */
export function getMappedResult<T = unknown>(
  store: Store,
  iri: string,
  type: string,
  mapping: { [iri: string]: string }
): T {
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  const result = { '@id': iri, '@type': type };
  for (const [predicate, key] of Object.entries(mapping)) {
    for (const quad of readQuads(store, result['@id'], predicate, null, null)) {
      const value =
        quad.object.termType === 'Literal'
          ? fromRdf(quad.object)
          : quad.object.id;
      result[key] = value;
    }
  }
  return result as unknown as T;
}
