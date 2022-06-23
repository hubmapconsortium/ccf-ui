import { Store, readQuads, DataFactory, NamedNode } from 'triple-store-utils';
import { getAnatomicalStructureTreeModel } from '../queries/ontology-tree-n3';
import { ccf, entity } from './prefixes';


/**
 * Function to add additional ccf_annotations to rui locations based on the
 * reference organ it was placed relative to.
 *
 * @param store the triple store holding the CCF.OWL data
 */
export function enrichRuiLocations(store: Store): void {
  const tree = getAnatomicalStructureTreeModel(store);
  const refOrganMap: Map<string, NamedNode[]> = new Map();

  // Build a map from reference organ to ccf annotations via representation_of and the AS partonomy
  for (const { subject: organ, object: term } of readQuads(store, null, ccf.spatialEntity.representation_of, null, null)) {
    const annotations = new Set([term.id]);
    let parent = tree.nodes[term.id]?.parent;
    while (parent) {
      if (annotations.has(parent)) {
        break;
      } else {
        annotations.add(parent);
        parent = tree.nodes[parent]?.parent;
      }
    }
    refOrganMap.set(organ.id, [ ...annotations].map(s => DataFactory.namedNode(s)));
  }

  // Add AS terms for rui locations based on the reference organs they are placed relative to
  for (const { object: ruiLocation } of readQuads(store, null, entity.spatialEntity, null, null)) {
    for (const { subject: placement } of readQuads(store, null, ccf.spatialPlacement.source, ruiLocation, null)) {
      for (const { object: organ } of readQuads(store, placement, ccf.spatialPlacement.target, null, null)) {
        for (const term of refOrganMap.get(organ.id) ?? []) {
          store.addQuad(DataFactory.namedNode(ruiLocation.id), ccf.spatialEntity.ccf_annotations, term);
        }
      }
    }
  }
}
