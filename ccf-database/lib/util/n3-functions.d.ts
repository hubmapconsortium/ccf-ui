import { Store } from 'triple-store-utils';
/**
 * Iterates over the key/value pairs for an IRI, using the specified mapping with quads from the store.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @param mapping Property mappings.
 * @returns an iterator over the key/value pairs
 */
export declare function getEntries(store: Store, iri: string, mapping: {
    [iri: string]: string;
}): Generator<[string, string | number]>;
/**
 * Creates an object of the specified type using quads from the store.
 *
 * @param store The triple store.
 * @param iri The data identifier.
 * @param type Type name.
 * @param mapping Property mappings.
 * @returns A new data object.
 */
export declare function getMappedResult<T = unknown>(store: Store, iri: string, type: string, mapping: {
    [iri: string]: string;
}): T;
