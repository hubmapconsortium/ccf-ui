import { Store } from 'triple-store-utils';
import { AggregateResult } from '../interfaces';
/**
 * Computes aggregate results.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns The list of aggregate results.
 */
export declare function getAggregateResults(ids: Set<string>, store: Store): AggregateResult[];
/**
 * Get a list of technology names used by datasets
 *
 * @param store The triple store.
 * @returns list of unique technology names in the data
 */
export declare function getDatasetTechnologyNames(store: Store): string[];
/**
 * Get a list of provider names from the database
 *
 * @param store The triple store.
 * @returns list of unique provider names in the data
 */
export declare function getProviderNames(store: Store): string[];
