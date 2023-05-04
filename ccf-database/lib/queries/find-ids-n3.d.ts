import { Store } from 'triple-store-utils';
import { CCFSpatialGraph } from '../ccf-spatial-graph';
import { Filter } from '../interfaces';
/**
 * Finds all ids of object matching a filter.
 *
 * @param store The triple store.
 * @param filter The filter to limit objects.
 * @returns A set of all ids matching the filter.
 */
export declare function findIds(store: Store, graph: CCFSpatialGraph, filter: Filter): Set<string>;
