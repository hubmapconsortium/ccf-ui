import { set } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, Store } from 'triple-store-utils';

import { ImageViewerData } from './../interfaces';
import { entity } from './../util/prefixes';


/** Entity iri to data property paths. */
const nonMetadataSet: { [iri: string]: string | string[] } = {
  [entity.id.id]: 'id',
  [entity.x('label').id]: 'label',
  [entity.x('organName').id]: 'organName',
};

/** Entity iri to metadata property paths. */
const metadataSet: { [iri: string]: string } = {
  [entity.sex.id]: 'Sex',
  [entity.age.id]: 'Age',
  [entity.x('bmi').id]: 'BMI',
  [entity.x('ethnicity').id]: 'Ethnicity',
  [entity.groupName.id]: 'Author Group',
  [entity.x('creator').id]: 'Creator',
  [entity.x('creation_date').id]: 'Date Created',
  [entity.x('modified_date').id]: 'Date Modified',
  [entity.x('donor_id').id]: 'HuBMAP Donor ID',
  [entity.x('organ_id').id]: 'HuBMAP Organ ID',
  [entity.x('tissue_id').id]: 'HUBMAP Tissue ID',
  [entity.x('specimen_type').id]: 'Specimen Type',
  [entity.x('data_types').id]: 'Data Type(s)',
  [entity.x('assay_types').id]: 'Assay(s)',
  [entity.x('spatial_bulk').id]: 'Spatial/Bulk',
  [entity.x('contains_sequence').id]: 'Contains Sequence',
  [entity.x('description').id]: 'Description'
};

/**
 * Extracts image viewer data from the store.
 *
 * @param iri Entity id.
 * @param store The triple store.
 * @returns The extracted data.
 */
export function getImageViewerData(iri: string, store: Store): ImageViewerData {
  const result = { '@id': iri, '@type': 'ImageViewerData' } as ImageViewerData;

  const propResults: { [predId: string]: string } = {};
  store.some((quad) => {
    const prop = nonMetadataSet[quad.predicate.id];
    const mdProp = metadataSet[quad.predicate.id];
    if (mdProp) {
      const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
      propResults[quad.predicate.id] = '' + value;
    }
    if (prop) {
      const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
      set(result, prop, value);
    }
    return false;
  }, DataFactory.namedNode(iri), null, null, null);

  result.metadata = Object.entries(metadataSet).map(([predId, label]) =>
    ({ label, value: propResults[predId] })
  ).filter((item) => item.value);

  return result;
}
