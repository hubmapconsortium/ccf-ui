import { OntologyNode } from '../../../shared/state/ontology/ontology.model';
import { FlatNode } from './flat-node';

function createOntologyNode(id: string): OntologyNode {
  return { id, label: id, parent: undefined, children: [] } as OntologyNode;
}

function linkOntologyNodes(parent: OntologyNode, ...children: OntologyNode[]): void {
  for (const child of children) {
    parent.children.push(child.id);
    child.parent = parent.id;
  }
}


describe('FlatNode', () => {
  // Node like objects
  const nodeRoot = createOntologyNode('root');
  const nodeInner = createOntologyNode('inner');
  const nodeLeaf = createOntologyNode('leaf');

  // Link nodes
  linkOntologyNodes(nodeRoot, nodeInner);
  linkOntologyNodes(nodeInner, nodeLeaf);

  // Flat nodes
  const flatNodeRoot = new FlatNode(nodeRoot, 0);
  const flatNodeInner = new FlatNode(nodeInner, 1);
  const flatNodeLeaf = new FlatNode(nodeLeaf, 2);

  describe('#create(node, level)', () => {
    const flatNode = FlatNode.create(nodeRoot, 0);

    it('returns a new flat node', () => {
      expect(flatNode).toEqual(jasmine.any(FlatNode));
    });

    it('sets the original node', () => {
      expect(flatNode.original).toEqual(nodeRoot);
    });

    it('sets the level', () => {
      expect(flatNode.level).toEqual(0);
    });
  });

  describe('label', () => {
    it('is the same as the node label', () => {
      expect(flatNodeRoot.label).toEqual(nodeRoot.label);
    });
  });

  describe('expandable', () => {
    it('is true for root nodes', () => {
      expect(flatNodeRoot.expandable).toBeTruthy();
    });

    it('is true for inner nodes', () => {
      expect(flatNodeInner.expandable).toBeTruthy();
    });

    it('is false for leaf nodes', () => {
      expect(flatNodeLeaf.expandable).toBeFalsy();
    });
  });
});
