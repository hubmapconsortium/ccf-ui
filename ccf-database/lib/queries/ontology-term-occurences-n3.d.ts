import { Store } from 'triple-store-utils';
/**
 * Get number of occurrences of ontology terms for a set of ids.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns Ontology term counts.
 */
export declare function getOntologyTermOccurences(ids: Set<string>, store: Store): Record<string, number>;
/**
 * Get number of occurrences of cell type terms for a set of ids.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns Ontology term counts.
 */
export declare function getCellTypeTermOccurences(ids: Set<string>, store: Store): Record<string, number>;
