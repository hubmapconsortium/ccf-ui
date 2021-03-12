import { set } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, Store } from 'triple-store-utils';

import { DatasetResult, DonorResult, ListResult, TissueBlockResult, TissueSectionResult } from '../interfaces';
import { entity } from '../util/prefixes';


/** Entity iri to property path. */
const listResultSet: { [iri: string]: string | string[] } = {
  [entity.label.id]: 'label',
  [entity.description.id]: 'description',
  [entity.link.id]: 'link'
};

const donorResultSet: { [iri: string]: string | string[] } = {
  ...listResultSet,
  [entity.providerName.id]: 'providerName'
};

const datasetResultSet: { [iri: string]: string | string[] } = {
  ...listResultSet,
  [entity.technology.id]: 'technology',
  [entity.thumbnail.id]: 'thumbnail',
};

const tissueSectionResultSet: { [iri: string]: string | string[] } = {
  ...listResultSet,
  [entity.sampleType.id]: 'sampleType',
  [entity.sectionNumber.id]: 'sectionNumber',
  [entity.datasets.id]: 'datasets',
};

const tissueBlockResultSet: { [iri: string]: string | string[] } = {
  ...listResultSet,
  [entity.sampleType.id]: 'sampleType',
  [entity.sectionCount.id]: 'sectionCount',
  [entity.sectionSize.id]: 'sectionSize',
  [entity.sectionUnits.id]: 'sectionUnits',

  [entity.donor.id]: 'donor',
  [entity.spatialEntity.id]: 'spatialEntityId',
  [entity.sections.id]: 'sections',
  [entity.datasets.id]: 'datasets',
};

/**
 * Extracts a single donor result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
 export function getDonorResult(store: Store, iri: string): DonorResult {
  const result = { '@id': iri, '@type': 'Donor' } as DonorResult;
  store.some((quad) => {
    const prop = donorResultSet[quad.predicate.id];
    if (prop) {
      const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
      set(result, prop, value);
    }
    return false;
  }, DataFactory.namedNode(iri), null, null, null);
  return result;
}

export function getDatasetResult(store: Store, iri: string): DatasetResult {
  const result = { '@id': iri, '@type': 'Dataset' } as DatasetResult;
  store.some((quad) => {
    const prop = datasetResultSet[quad.predicate.id];
    if (prop) {
      const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
      set(result, prop, value);
    }
    return false;
  }, DataFactory.namedNode(iri), null, null, null);
  return result;
}

/**
 * Extracts a single tissue section result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
 export function getTissueSectionResult(store: Store, iri: string): TissueSectionResult {
  const result = { '@id': iri, '@type': 'Sample', datasets: [] as DatasetResult[] } as TissueSectionResult;
  store.some((quad) => {
    const prop = tissueSectionResultSet[quad.predicate.id];
    if (prop) {
      const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
      if (prop === 'datasets') {
        const dataset = getDatasetResult(store, value as string);
        result[prop].push(dataset);
      } else {
        set(result, prop, value);
      }
    }
    return false;
  }, DataFactory.namedNode(iri), null, null, null);
  return result;
}

/**
 * Extracts a single tissue block result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
export function getTissueBlockResult(store: Store, iri: string): TissueBlockResult {
  const result = { '@id': iri, '@type': 'Sample',
    sections: [] as TissueSectionResult[], datasets: [] as DatasetResult[]
  } as TissueBlockResult;
  store.some((quad) => {
    const prop = tissueBlockResultSet[quad.predicate.id];
    if (prop) {
      const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
      if (prop === 'sections') {
        const section = getTissueSectionResult(store, value as string);
        result[prop].push(section);
      } else if (prop === 'datasets') {
        const dataset = getDatasetResult(store, value as string);
        result[prop].push(dataset);
      } else if (prop === 'donor') {
        result[prop] = getDonorResult(store, value as string);
      } else {
        set(result, prop, value);
      }
    }
    return false;
  }, DataFactory.namedNode(iri), null, null, null);
  return result;
}

export function getListResult(store: Store, iri: string): ListResult {
  const block = getTissueBlockResult(store, iri);
  const datasets = [block.datasets]
    .concat(block.sections.map(s => s.datasets))
    .reduce((acc, d) => acc.concat(d), []);
  const goodDataset = datasets.find(d => d.thumbnail.indexOf('thumbnails') !== -1) ||
    datasets.filter(d => d.thumbnail !== 'assets/icons/ico-unknown.svg').find(d => d.thumbnail);

  return {
    '@id': block['@id'],
    '@type': 'ListResult',
    id: block['@id'],
    label: block.donor.label,
    shortInfo: [
      block.label,
      block.donor.providerName,
      `${block.sections.length} sections, ${datasets.length} datasets`
    ],
    thumbnailUrl: goodDataset ? goodDataset.thumbnail : 'assets/icons/ico-unknown.svg',
    downloadUrl: `${block.link}`,
    downloadTooltip: 'View Tissue Block',
    resultUrl: goodDataset ? goodDataset.link : block.link,
    resultType: 'external_link'
  };
}
