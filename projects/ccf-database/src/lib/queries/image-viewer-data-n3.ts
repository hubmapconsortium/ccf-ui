import { set } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, N3Store } from 'triple-store-utils';

import { entity } from './../util/prefixes';
import { ImageViewerData } from './../interfaces';


const nonMetadataSet: { [iri: string]: string | string[] } = {
  [entity.id.id]: 'id',
  [entity.x('label').id]: 'label',
  [entity.x('organName').id]: 'organName',
};

const metadataSet: { [iri: string]: string } = {
  [entity.id.id]: 'UUID',
  [entity.x('groupName').id]: 'Group (TMC) Name',
  [entity.x('entityType').id]: 'Entity Type',
  [entity.x('displayDOI').id]: 'Display DOI',
  [entity.x('label').id]: 'Label',
  [entity.x('description').id]: 'Description',
  [entity.x('shortInfo0').id]: 'Short Info 0',
  [entity.x('shortInfo1').id]: 'Short Info 1',
  [entity.x('shortInfo2').id]: 'Short Info 2'
};

export function getImageViewerData(iri: string, store: N3Store): ImageViewerData {
  const result = {'@id': iri, '@type': 'ImageViewerData' } as ImageViewerData;

  const propResults: { [predId:string]: string } = {};
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
    ({ label, value: propResults[predId]})
  ).filter((item) => item.value);

  return result;
}
