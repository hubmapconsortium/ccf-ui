import { memoize, set } from 'lodash';
import { fromRdf } from 'rdf-literal';
import { DataFactory, Store } from 'triple-store-utils';

import { OntologyTreeModel, OntologyTreeNode } from '../interfaces';
import { ccf, rui } from '../util/prefixes';


export function getOntologyTreeNode(store: Store, iri: string, relationshipIri: string): OntologyTreeNode {
  const node = DataFactory.namedNode(iri);
  const result: OntologyTreeNode = {
    '@id': iri, '@type': 'OntologyTreeNode', id: iri, parent: '',
    children: [] as string[], synonymLabels: [] as string[], label: ''
  };

  const ontologyTreeNodeResult = {
    [ccf.ontologyNode.label.id]: 'label',
    [relationshipIri]: 'parent',
    [ccf.ontologyNode.synonymLabels.id]: 'synonymLabels',
  };

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

  result.children = store.getSubjects(relationshipIri, node, null).map(s => s.id);

  return result;
}

export function getOntologyTreeModelSlowly(store: Store, rootIri: string, rootLabel: string, relationshipIri: string): OntologyTreeModel {
  const result: OntologyTreeModel = { root: rootIri, nodes: {} };
  const seen = new Set<string>();
  store.some((quad) => {
    seen.add(quad.subject.id);
    seen.add(quad.predicate.id);
    return false;
  }, null, relationshipIri, null, null);

  for (const iri of seen) {
    result.nodes[iri] = getOntologyTreeNode(store, iri, relationshipIri);
  }

  if (!result.nodes[rootIri]) {
    const rootChildren = store
      .getSubjects(relationshipIri, rootIri, null).map(o => o.id)
      .sort((a, b) => result.nodes[a].label.localeCompare(result.nodes[b].label));

    result.nodes[rootIri] = {
      '@id': rootIri,
      '@type': 'OntologyTreeNode',
      id: rootIri,
      label: rootLabel,
      children: rootChildren,
      synonymLabels: []
    } as unknown as OntologyTreeNode;
  }

  return result;
}

export const getOntologyTreeModel = memoize(getOntologyTreeModelSlowly, (_store, rootIri, relationshipIri) => rootIri + relationshipIri);

export function getAnatomicalStructureTreeModel(store: Store): OntologyTreeModel {
  const model = getOntologyTreeModel(store, rui.body.id, 'body', ccf.asctb.part_of.id);
  model.nodes[rui.body.id].children = [
    'http://purl.obolibrary.org/obo/UBERON_0000955', // Brain
    'http://purl.obolibrary.org/obo/UBERON_0000029', // Lymph Node
    // 'http://purl.obolibrary.org/obo/UBERON_0002509', // Mesenteric Lymph Node
    'http://purl.obolibrary.org/obo/UBERON_0000970', // Eye
    // 'http://purl.obolibrary.org/obo/UBERON_0004548', // Eye, L
    // 'http://purl.obolibrary.org/obo/FMA_54449', // Eye, R
    'http://purl.obolibrary.org/obo/UBERON_0003889', // Fallopian Tube
    // 'http://purl.obolibrary.org/obo/UBERON_0001303', // Fallopian Tube, L
    // 'http://purl.obolibrary.org/obo/UBERON_0001302', // Fallopian Tube, R
    'http://purl.obolibrary.org/obo/UBERON_0000948', // Heart
    'http://purl.obolibrary.org/obo/UBERON_0002113', // Kidney
    // 'http://purl.obolibrary.org/obo/UBERON_0004538', // Kidney, L
    // 'http://purl.obolibrary.org/obo/UBERON_0004539', // Kidney, R
    'http://purl.obolibrary.org/obo/UBERON_0001465', // Knee
    // 'http://purl.obolibrary.org/obo/FMA_24978', // Knee, L
    // 'http://purl.obolibrary.org/obo/FMA_24977', // Knee, R
    'http://purl.obolibrary.org/obo/UBERON_0002107', // Liver
    'http://purl.obolibrary.org/obo/UBERON_0002048', // Lungs
    'http://purl.obolibrary.org/obo/UBERON_0000992', // Ovary
    // 'http://purl.obolibrary.org/obo/FMA_7214', // Ovary, L
    // 'http://purl.obolibrary.org/obo/FMA_7213', // Ovary, R
    'http://purl.obolibrary.org/obo/UBERON_0001264', // Pancreas
    'http://purl.obolibrary.org/obo/UBERON_0001270', // Pelvis
    'http://purl.obolibrary.org/obo/UBERON_0002367', // Prostate
    'http://purl.obolibrary.org/obo/UBERON_0002097', // Skin
    'http://purl.obolibrary.org/obo/UBERON_0002108', // Small Intestine
    'http://purl.obolibrary.org/obo/UBERON_0000059', // Large Intestine
    'http://purl.obolibrary.org/obo/UBERON_0002106', // Spleen
    'http://purl.obolibrary.org/obo/UBERON_0002370', // Thymus
    'http://purl.obolibrary.org/obo/UBERON_0000056', // Ureter
    // 'http://purl.obolibrary.org/obo/UBERON_0001223', // Ureter, L
    // 'http://purl.obolibrary.org/obo/UBERON_0001222', // Ureter, R
    'http://purl.obolibrary.org/obo/UBERON_0001255', // Urinary Bladder
    'http://purl.obolibrary.org/obo/UBERON_0000995', // Uterus
    'http://purl.obolibrary.org/obo/UBERON_0004537' // Blood Vasculature
  ].filter(iri => iri in model.nodes);
  return model;
}

export function getCellTypeTreeModel(store: Store): OntologyTreeModel {
  return getOntologyTreeModel(store, rui.cell.id, 'cell', ccf.asctb.ct_is_a.id);
}
