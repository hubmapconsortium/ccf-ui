import { set } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, Store } from 'triple-store-utils';

import { OntologyTreeModel, OntologyTreeNode } from '../interfaces';
import { ccf } from '../util/prefixes';
import { rui } from './../util/prefixes';


const ontologyTreeNodeResult = {
  [ccf.ontologyNode.label.id]: 'label',
  [ccf.ontologyNode.parent.id]: 'parent',
  [ccf.ontologyNode.synonymLabels.id]: 'synonymLabels',
};

export function getOntologyTreeNode(store: Store, iri: string): OntologyTreeNode {
  const node = DataFactory.namedNode(iri);
  const result = {'@id': iri, '@type': 'OntologyTreeNode', id: iri, parent: '',
    children: [] as string[], synonymLabels: [] as string[]} as OntologyTreeNode;

    store.some((quad) => {
      const prop = ontologyTreeNodeResult[quad.predicate.id];
      if (prop) {
        const value = quad.object.termType === 'Literal' ? fromRdf(quad.object) : quad.object.id;
        if (prop === 'synonymLabels') {
          result.synonymLabels.push(value);
        } else {
          set(result, prop, value);
        }
      }
      return false;
    }, node, null, null, null);

    result.children = store.getSubjects(ccf.ontologyNode.children, node, null).map(s => s.id);

    return result;
}

export function getOntologyTreeModel(store: Store): OntologyTreeModel {
  const result = {root: rui.body.id, nodes: {}} as OntologyTreeModel;
  const seen = new Set<string>();
  store.some((quad) => {
    seen.add(quad.subject.id);
    seen.add(quad.predicate.id);
    return false;
  }, null, ccf.ontologyNode.parent, null, null);

  for (const iri of seen) {
    result.nodes[iri] = getOntologyTreeNode(store, iri);
  }

  return result;
}
