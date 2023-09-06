/* eslint-disable @typescript-eslint/naming-convention */
import { Store } from 'triple-store-utils';
import { DatasetResult, DonorResult, TissueBlockResult, TissueSectionResult } from '../interfaces';
import { getEntries, getMappedResult } from '../util/n3-functions';
import { entity } from '../util/prefixes';


/** Entity iri to property path. */
const listResultSet: { [iri: string]: string } = {
  [entity.label.id]: 'label',
  [entity.description.id]: 'description',
  [entity.link.id]: 'link'
};

const donorResultSet: { [iri: string]: string } = {
  ...listResultSet,
  [entity.providerName.id]: 'providerName'
};

const datasetResultSet: { [iri: string]: string } = {
  ...listResultSet,
  [entity.technology.id]: 'technology',
  [entity.thumbnail.id]: 'thumbnail',
};

const tissueSectionResultSet: { [iri: string]: string } = {
  ...listResultSet,
  [entity.sampleType.id]: 'sampleType',
  [entity.sectionNumber.id]: 'sectionNumber',
  [entity.datasets.id]: 'datasets',
};

const tissueBlockResultSet: { [iri: string]: string } = {
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
  return getMappedResult(store, iri, 'Donor', donorResultSet);
}

/**
 * Extracts a single dataset result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
export function getDatasetResult(store: Store, iri: string): DatasetResult {
  return getMappedResult(store, iri, 'Dataset', datasetResultSet);
}

/**
 * Extracts a single tissue section result from the triple store.
 *
 * @param store The triple store.
 * @param iri The entity id.
 * @returns The list data.
 */
export function getTissueSectionResult(store: Store, iri: string): TissueSectionResult {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const result = { '@id': iri, '@type': 'Sample', datasets: [] as DatasetResult[] } as TissueSectionResult;
  for (const [key, value] of getEntries(store, iri, tissueSectionResultSet)) {
    if (key === 'datasets') {
      const dataset = getDatasetResult(store, value as string);
      result[key].push(dataset);
    } else {
      result[key] = value;
    }
  }
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
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const result = { '@id': iri, '@type': 'Sample',
    sections: [] as TissueSectionResult[], datasets: [] as DatasetResult[]
  } as TissueBlockResult;
  for (const [key, value] of getEntries(store, iri, tissueBlockResultSet)) {
    if (key === 'sections') {
      const section = getTissueSectionResult(store, value as string);
      result[key].push(section);
    } else if (key === 'datasets') {
      const dataset = getDatasetResult(store, value as string);
      result[key].push(dataset);
    } else if (key === 'donor') {
      result[key] = getDonorResult(store, value as string);
    } else {
      result[key] = value;
    }
  }
  return result;
}
