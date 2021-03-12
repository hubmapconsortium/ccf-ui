/* eslint-disable @typescript-eslint/naming-convention */
import { Store } from 'triple-store-utils';

import { AggregateResult } from '../interfaces';
import { entity } from '../util/prefixes';


/**
 * Computes aggregate results.
 *
 * @param ids Ids of objects to calculate aggregate over.
 * @param store The triple store.
 * @returns The list of aggregate results.
 */
export function getAggregateResults(ids: Set<string>, store: Store): AggregateResult[] {
  const donors = new Set<string>();
  store.some((quad) => {
    if (ids.has(quad.subject.id)) {
      donors.add(quad.object.id);
    }
    return false;
  }, null, entity.donor, null, null);

  const centers = new Set<string>();
  store.some((quad) => {
    if (donors.has(quad.subject.id)) {
      centers.add(quad.object.id);
    }
    return false;
  }, null, entity.providerUUID, null, null);

  const tissueBlocks = new Set<string>();
  store.forSubjects((subject) => {
    if (ids.has(subject.id)) {
      tissueBlocks.add(subject.id);
    }
  }, entity.spatialEntity, null, null);

  const tissueSections = new Set<string>();
  store.some((quad) => {
    if (tissueBlocks.has(quad.subject.id)) {
      tissueSections.add(quad.object.id);
    }
    return false;
  }, null, entity.sections, null, null);

  const tissueDatasets = new Set<string>();
  store.some((quad) => {
    const subject = quad.subject;
    if (tissueBlocks.has(subject.id) || tissueSections.has(subject.id)) {
      tissueDatasets.add(quad.object.id);
    }
    return false;
  }, null, entity.datasets, null, null);

  const results: { [key: string]: number } = {
    'Tissue Data Providers': centers.size,
    Donors: donors.size,
    'Tissue Blocks': tissueBlocks.size,
    'Tissue Sections': tissueSections.size,
    'Tissue Datasets': tissueDatasets.size
  };

  return Object.entries(results).map(([label, count]) => ({ label, count }));
}
