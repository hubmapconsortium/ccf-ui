/* eslint-disable @typescript-eslint/naming-convention */
import { readQuads, Store } from 'triple-store-utils';

import { AggregateResult } from '../interfaces';
import { entity } from '../util/prefixes';


function getObjects(store: Store, ids: Set<string>, predicate: string): Set<string> {
  const objects = new Set<string>();
  for (const id of ids) {
    for (const quad of readQuads(store, id, predicate, null, null)) {
      objects.add(quad.object.id);
    }
  }
  return objects;
}

/**
 * Computes aggregate results.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns The list of aggregate results.
 */
export function getAggregateResults(ids: Set<string>, store: Store): AggregateResult[] {
  const donors = getObjects(store, ids, entity.donor.id);
  const centers = getObjects(store, donors, entity.providerUUID.id);

  const tissueBlocks = new Set<string>();
  for (const id of ids) {
    for (const quad of readQuads(store, id, entity.spatialEntity, null, null)) {
      tissueBlocks.add(quad.subject.id);
    }
  }

  const tissueSections = getObjects(store, tissueBlocks, entity.sections.id);
  const tissueDatasets = new Set<string>([
    ...getObjects(store, tissueBlocks, entity.datasets.id),
    ...getObjects(store, tissueSections, entity.datasets.id)
  ]);

  const results: { [key: string]: number } = {
    'Tissue Data Providers': centers.size,
    Donors: donors.size,
    'Tissue Blocks': tissueBlocks.size,
    'Tissue Sections': tissueSections.size,
    'Tissue Datasets': tissueDatasets.size
  };

  return Object.entries(results).map(([label, count]) => ({ label, count }));
}

/**
 * Get a list of technology names used by datasets
 *
 * @param store The triple store.
 * @returns list of unique technology names in the data
 */
export function getDatasetTechnologyNames(store: Store): string[] {
  const names = new Set<string>();
  for (const quad of readQuads(store, null, entity.technology, null, null)) {
    names.add(quad.object.value);
  }
  return Array.from(names).sort();
}

/**
 * Get a list of provider names from the database
 *
 * @param store The triple store.
 * @returns list of unique provider names in the data
 */
export function getProviderNames(store: Store): string[] {
  const names = new Set<string>();
  for (const quad of readQuads(store, null, entity.providerName, null, null)) {
    names.add(quad.object.value);
  }
  return Array.from(names).sort();
}
