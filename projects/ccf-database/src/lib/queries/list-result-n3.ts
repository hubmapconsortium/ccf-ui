import { set } from 'lodash';
import { N3Store, DataFactory } from 'triple-store-utils';

import { ListResult } from '../interfaces';
import { entity } from '../util/prefixes';
import { fromRdf } from 'rdf-literal';


const listResultSet: { [iri: string]: string | string[] } = {
  [entity.id.id]: 'id',
  [entity.x('label').id]: 'label',
  [entity.x('shortInfo0').id]: ['shortInfo', '0'],
  [entity.x('shortInfo1').id]: ['shortInfo', '1'],
  [entity.x('shortInfo2').id]: ['shortInfo', '2'],
  [entity.x('thumbnailUrl').id]: 'thumbnailUrl',
  [entity.x('downloadUrl').id]: 'downloadUrl',
  [entity.x('downloadTooltip').id]: 'downloadTooltip',
  [entity.x('resultUrl').id]: 'resultUrl',
  [entity.x('resultType').id]: 'resultType'
};
const shortInfoKey = entity.x('shortInfo').id;

export function getListResult(store: N3Store, iri: string): ListResult {
  const result = {'@id': iri, '@type': 'ListResult' } as ListResult;
    store.some((quad) => {
    const prop = listResultSet[quad.predicate.id];
    if (prop) {
      const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
      set(result, prop, value);
    }
    return false;
  }, DataFactory.namedNode(iri), null, null, null);
  return result;
}
