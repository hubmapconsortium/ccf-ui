/* eslint-disable @typescript-eslint/naming-convention */
import memoize from 'lodash/memoize';
import { readQuads, Store } from 'triple-store-utils';
import { OntologyTreeModel, OntologyTreeNode } from '../interfaces';
import { getEntries } from '../util/n3-functions';
import { ccf, rdfs, rui } from '../util/prefixes';

export function getOntologyTreeNode(
  store: Store,
  iri: string,
  relationshipIri: string
): OntologyTreeNode {
  const result: OntologyTreeNode = {
    '@id': iri,
    '@type': 'OntologyTreeNode',
    id: iri,
    parent: '',
    children: [] as string[],
    synonymLabels: [] as string[],
    label: '',
  };

  const ontologyTreeNodeResult = {
    [ccf.ontologyNode.label.id]: 'label',
    [relationshipIri]: 'parent',
    [ccf.ontologyNode.synonymLabels.id]: 'synonymLabels',
  };

  for (const [key, value] of getEntries(store, iri, ontologyTreeNodeResult)) {
    if (key === 'synonymLabels') {
      result.synonymLabels.push(value as string);
    } else {
      result[key] = value;
    }
  }
  result.children = store
    .getSubjects(relationshipIri, iri, null)
    .map((s) => s.id);

  return result;
}

export function getOntologyTreeModel(
  store: Store,
  rootIri: string,
  rootLabel: string,
  relationshipIri: string
): OntologyTreeModel {
  const result: OntologyTreeModel = { root: rootIri, nodes: {} };
  const seen = new Set<string>();
  for (const quad of readQuads(store, null, relationshipIri, null, null)) {
    seen.add(quad.subject.id);
    seen.add(quad.object.id);
  }

  for (const iri of seen) {
    result.nodes[iri] = getOntologyTreeNode(store, iri, relationshipIri);
  }

  if (!result.nodes[rootIri]) {
    result.nodes[rootIri] = {
      '@id': rootIri,
      '@type': 'OntologyTreeNode',
      id: rootIri,
      label: rootLabel,
      children: [],
      synonymLabels: [],
    } as unknown as OntologyTreeNode;
  }

  const rootChildren = store
    .getSubjects(relationshipIri, rootIri, null)
    .map((o) => o.id)
    .sort((a, b) => result.nodes[a].label.localeCompare(result.nodes[b].label));
  result.nodes[rootIri].children = rootChildren;

  treeify(result);

  return result;
}

/**
 * Recursive function to ensure that the given ontology tree model is actually a tree by essentially using a BFS search.
 *
 * @param model the ontology tree model to mutate
 * @param nodeIri the tree node iri to modify. Starts at root in the base case
 * @param seen a set of IRIs that have been 'seen' so far to remove loops in the graph
 */
function treeify(
  model: OntologyTreeModel,
  nodeIri: string | undefined = undefined,
  seen: Set<string> = new Set()
) {
  const node = model.nodes[nodeIri ?? model.root];
  if (node) {
    node.children = node.children.filter((n) => !seen.has(n));
    node.children.forEach((n) => seen.add(n));
    for (const childId of node.children) {
      treeify(model, childId, seen);
      if (model.nodes[childId]) {
        model.nodes[childId].parent = node['@id'];
      }
    }
  }
}

export function getAnatomicalStructureTreeModelSlowly(
  store: Store
): OntologyTreeModel {
  const model = getOntologyTreeModel(
    store,
    rui.body.id,
    'body',
    ccf.asctb.part_of.id
  );
  model.nodes[rui.body.id].children = [
    'http://purl.obolibrary.org/obo/UBERON_0000955', // Brain
    'http://purl.obolibrary.org/obo/UBERON_0000029', // Lymph Node
    // 'http://purl.obolibrary.org/obo/UBERON_0002509', // Mesenteric Lymph Node
    'http://purl.obolibrary.org/obo/UBERON_0000970', // Eye
    // 'http://purl.obolibrary.org/obo/UBERON_0004548', // Eye, L
    // 'http://purl.org/sig/ont/fma/fma54449', // Eye, R
    'http://purl.obolibrary.org/obo/UBERON_0003889', // Fallopian Tube
    // 'http://purl.obolibrary.org/obo/UBERON_0001303', // Fallopian Tube, L
    // 'http://purl.obolibrary.org/obo/UBERON_0001302', // Fallopian Tube, R
    'http://purl.obolibrary.org/obo/UBERON_0000948', // Heart
    'http://purl.obolibrary.org/obo/UBERON_0002113', // Kidney
    // 'http://purl.obolibrary.org/obo/UBERON_0004538', // Kidney, L
    // 'http://purl.obolibrary.org/obo/UBERON_0004539', // Kidney, R
    'http://purl.obolibrary.org/obo/UBERON_0001465', // Knee
    // 'http://purl.org/sig/ont/fma/fma24978', // Knee, L
    // 'http://purl.org/sig/ont/fma/fma24977', // Knee, R
    'http://purl.obolibrary.org/obo/UBERON_0001737', // Larynx
    'http://purl.obolibrary.org/obo/UBERON_0002107', // Liver
    'http://purl.obolibrary.org/obo/UBERON_0002048', // Lungs
    'http://purl.obolibrary.org/obo/UBERON_0002182', // Main Bronchus
    'http://purl.obolibrary.org/obo/UBERON_0001911', // Mammary Gland
    // 'http://purl.org/sig/ont/fma/fma57991', // Mammary Gland, L
    // 'http://purl.org/sig/ont/fma/fma57987', // Mammary Gland, R
    'http://purl.obolibrary.org/obo/UBERON_0000992', // Ovary
    // 'http://purl.org/sig/ont/fma/fma7214', // Ovary, L
    // 'http://purl.org/sig/ont/fma/fma7213', // Ovary, R
    'http://purl.obolibrary.org/obo/UBERON_0002373', // Palatine Tonsil
    // 'http://purl.org/sig/ont/fma/fma54974', // Palatine Tonsil, L
    // 'http://purl.org/sig/ont/fma/fma54973', // Palatine Tonsil, R
    'http://purl.obolibrary.org/obo/UBERON_0001264', // Pancreas
    'http://purl.obolibrary.org/obo/UBERON_0001270', // Pelvis
    'http://purl.obolibrary.org/obo/UBERON_0001987', // Placenta
    'http://purl.obolibrary.org/obo/UBERON_0002367', // Prostate
    'http://purl.obolibrary.org/obo/UBERON_0002097', // Skin
    'http://purl.obolibrary.org/obo/UBERON_0002108', // Small Intestine
    'http://purl.obolibrary.org/obo/UBERON_0002240', // Spinal Cord
    'http://purl.obolibrary.org/obo/UBERON_0000059', // Large Intestine
    'http://purl.obolibrary.org/obo/UBERON_0002106', // Spleen
    'http://purl.obolibrary.org/obo/UBERON_0002370', // Thymus
    'http://purl.obolibrary.org/obo/UBERON_0003126', // Trachea
    'http://purl.obolibrary.org/obo/UBERON_0000056', // Ureter
    // 'http://purl.obolibrary.org/obo/UBERON_0001223', // Ureter, L
    // 'http://purl.obolibrary.org/obo/UBERON_0001222', // Ureter, R
    'http://purl.obolibrary.org/obo/UBERON_0001255', // Urinary Bladder
    'http://purl.obolibrary.org/obo/UBERON_0000995', // Uterus
    'http://purl.obolibrary.org/obo/UBERON_0004537', // Blood Vasculature
    // 'http://purl.obolibrary.org/obo/UBERON_0000467', // Anatomical System
  ].filter((iri) => iri in model.nodes);
  return model;
}

export const getAnatomicalStructureTreeModel = memoize(
  getAnatomicalStructureTreeModelSlowly,
  () => ''
);

export function getCellTypeTreeModel(store: Store): OntologyTreeModel {
  return getOntologyTreeModel(store, rui.cell.id, 'cell', ccf.asctb.ct_is_a.id);
}

function formBiomarkerNode(
  id: string,
  label: string,
  parent: string,
  children: string[]
): OntologyTreeNode {
  return {
    ['@id']: `http://purl.org/ccf/${id}`,
    id,
    label,
    parent: parent ?? '',
    children: children ?? [],
    synonymLabels: [],
    ['@type']: 'OntologyTreeNode',
  };
}

export function getBiomarkerTreeModel(store: Store): OntologyTreeModel {
  const bmType = ccf.x('ccf_biomarker_type');

  const nodes: Record<string, OntologyTreeNode> = {
    biomarkers: formBiomarkerNode('biomarkers', 'Biomarkers', '', []),
  };
  for (const quad of readQuads(store, null, bmType, null, null)) {
    const bm = quad.object.value;
    const iri = quad.subject.id;
    if (!nodes[bm]) {
      nodes[bm] = formBiomarkerNode(bm, bm[0].toUpperCase() + bm.slice(1), 'biomarkers', []);
      nodes['biomarkers'].children.push(bm);
    }
    nodes[bm].children.push(iri);

    const result = formBiomarkerNode(iri, '', bm, []);
    const ontologyTreeNodeResult = {
      [ccf.ontologyNode.label.id]: 'label',
      [rdfs.label.id]: 'synonymLabels',
    };

    for (const [key, value] of getEntries(store, iri, ontologyTreeNodeResult)) {
      if (key === 'synonymLabels') {
        if (value && value !== result.label) {
          result.synonymLabels.push(value as string);
        }
      } else {
        result[key] = value;
      }
    }

    for (const node of Object.values(nodes)) {
      if (node.children.length > 1) {
        node.children.sort((a, b) => nodes[a]?.label.localeCompare(nodes[b]?.label));
      }
    }

    nodes[iri] = result;
  }

  return {
    root: 'biomarkers',
    nodes
  };
}
