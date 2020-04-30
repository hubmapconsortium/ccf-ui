import { set } from 'lodash';
import { N3Store, DataFactory } from 'triple-store-utils';

import { ListResult } from '../interfaces';
import { entity } from '../util/prefixes';
import { fromRdf } from 'rdf-literal';


const listResultSet: { [iri: string]: string | string[] } = {
  [entity.id.id]: 'id',
  [entity.x('label').id]: 'label',
  [entity.x('shortInfo').id]: 'shortInfo',
};

export function getListResult(store: N3Store, iri: string): ListResult {
  const result = {'@id': iri, '@type': 'ListResult' } as ListResult;
  store.some((quad) => {
    const prop = listResultSet[quad.predicate.id];
    if (prop) {
      if (quad.object.termType === 'Literal') {
        set(result, prop, fromRdf(quad.object));
      } else {
        set(result, prop, quad.object.id);
      }
    }
    return false;
  }, DataFactory.namedNode(iri), null, null, null);
  return result;
}
