import { DebugElement, EventEmitter, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { OntologyNode } from '../../shared/state/ontology/ontology.model';
import { OntologyTreeComponent } from './ontology-tree.component';
import { OntologyTreeModule } from './ontology-tree.module';
import { FlatNode } from './shared/flat-node';

function createOntologyNode(id: string): OntologyNode {
  return { id, label: id, parent: undefined, children: [] } as OntologyNode;
}

function linkOntologyNodes(parent: OntologyNode, ...children: OntologyNode[]): void {
  for (const child of children) {
    parent.children.push(child.id);
    child.parent = parent.id;
  }
}

function createOntologyNodeParentFinder(...nodes: OntologyNode[]): (node: OntologyNode) => OntologyNode {
  return node => nodes.find(candidate => candidate.id === node.parent);
}

function createOntologyNodeChildrenFinder(...nodes: OntologyNode[]): (node: OntologyNode) => OntologyNode[] {
  return node => nodes.filter(candidate => candidate.parent === node.id);
}

describe('OntologyTreeComponent', () => {
  // Node like objects
  const nodeRoot = createOntologyNode('root');
  const nodeA = createOntologyNode('a');
  const nodeB = createOntologyNode('b');
  const nodeC = createOntologyNode('c');

  // Link nodes
  linkOntologyNodes(nodeRoot, nodeA, nodeB);
  linkOntologyNodes(nodeB, nodeC);

  // Flat nodes
  const flatRoot = new FlatNode(nodeRoot, 0);
  const flatA = new FlatNode(nodeA, 1);
  const flatB = new FlatNode(nodeB, 1);
  const flatC = new FlatNode(nodeC, 2);

  // Lookup functions
  const getParent = createOntologyNodeParentFinder(nodeRoot, nodeA, nodeB, nodeC);
  const getChildren = createOntologyNodeChildrenFinder(nodeRoot, nodeA, nodeB, nodeC);

  let component: OntologyTreeComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let outputs: Record<'nodeSelected', EventEmitter<any>>;
  let shallow: Shallow<OntologyTreeComponent>;

  beforeEach(async () => {
    const bind = { nodes: [nodeRoot], getChildren: getChildren };

    shallow = new Shallow(OntologyTreeComponent, OntologyTreeModule);
    ({ find, instance: component, outputs } = await shallow.render({ bind }));
  });

  describe('component', () => {
    describe('expandAndSelect(node)', () => {
      let collapseAllSpy: jasmine.Spy;
      let expandSpy: jasmine.Spy;

      beforeEach(() => {
        collapseAllSpy = spyOn(component.control, 'collapseAll');
        expandSpy = spyOn(component.control, 'expand');

        component.expandAndSelect(nodeC, getParent);
      });

      it('collapses all nodes', () => {
        expect(collapseAllSpy).toHaveBeenCalled();
      });

      it('expands all nodes in the parent chain', () => {
        expect(expandSpy).toHaveBeenCalledWith(flatRoot);
        expect(expandSpy).toHaveBeenCalledWith(flatB);
      });
    });

    describe('isInnerNode(any, flat)', () => {
      it('returns true for nodes with children', () => {
        expect(component.isInnerNode(undefined, flatRoot)).toBeTruthy();
      });

      it('returns false for leaf nodes', () => {
        expect(component.isInnerNode(undefined, flatC)).toBeFalsy();
      });
    });

    describe('isSelected(flat)', () => {
      beforeEach(() => (component as any).selectedNode = flatA);

      it('returns true when flat === current selection', () => {
        expect(component.isSelected(flatA)).toBeTruthy();
      });

      it('returns false when flat !== current selection', () => {
        expect(component.isSelected(flatB)).toBeFalsy();
      });
    });

    describe('select(flat)', () => {
      beforeEach(() => (component as any).selectedNode = flatA);

      it('emits the new selection', () => {
        component.select(flatB);
        expect(outputs.nodeSelected.emit).toHaveBeenCalledWith(nodeB);
      });

      it('deselects if the new selection is the same as the old selection', () => {
        component.select(flatA);
        expect(outputs.nodeSelected.emit).toHaveBeenCalledWith(undefined);
      });
    });
  });

  describe('dom', () => {
    // Add tests!
  });
});
