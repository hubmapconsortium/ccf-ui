import { Store, readQuads, DataFactory, NamedNode } from 'triple-store-utils';
import { getAnatomicalStructureTreeModel } from '../queries/ontology-tree-n3';
import { ccf, entity } from './prefixes';


export function enrichRuiLocations(store: Store): void {
  const tree = getAnatomicalStructureTreeModel(store);
  const refOrganMap: Map<string, NamedNode<string>[]> = new Map();

  for (const { subject: organ, object: term } of readQuads(store, null, ccf.spatialEntity.representation_of, null, null)) {
    const annotations = [term.id];
    let parent = tree.nodes[term.id]?.parent;
    while (parent) {
      annotations.push(parent);
      parent = tree.nodes[parent]?.parent;
    }
    refOrganMap.set(organ.id, annotations.map(s => DataFactory.namedNode(s)));
  }

  for (const { object: ruiLocation } of readQuads(store, null, entity.spatialEntity, null, null)) {
    let annotations: NamedNode<string>[] = [];
    for (const { subject: placement } of readQuads(store, null, ccf.spatialPlacement.source, ruiLocation, null)) {
      for (const { object: organ } of readQuads(store, placement, ccf.spatialPlacement.target, null, null)) {
        if (refOrganMap.has(organ.id)) {
          annotations = refOrganMap.get(organ.id)!;
        } else {
          console.log(organ.id);
        }
      }
    }
    for (const term of annotations) {
      store.addQuad(DataFactory.namedNode(ruiLocation.id), ccf.spatialEntity.ccf_annotations, term, undefined);
    }
  }
}
