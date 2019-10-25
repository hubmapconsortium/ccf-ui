import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';

import { OntologyNode, OntologyStateModel } from './ontology.model';
import { createModel, OntologyState, linkChildren, addSubtree } from './ontology.state';

describe('State', () => {
  describe('Ontology', () => {
    const node1 = { id: 'node1', parent: undefined, children: ['node2'] } as OntologyNode;
    const node2 = { id: 'node2', parent: 'node1', children: [] } as OntologyNode;
    const mockState: OntologyStateModel = {
      root: node1.id,
      nodes: { [node1.id]: node1, [node2.id]: node2 }
    };

    let store: Store;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NgxsModule.forRoot([OntologyState])],
        providers: [
          { provide: HttpClient, useValue: { get: () => of('{}') } }
        ]
      });
    });

    beforeEach(() => {
      store = TestBed.get(Store);
    });

    describe('actions', () => {
      // Additional tests
    });

    describe('helpers', () => {

      const parent: OntologyNode = {
        id: 'parent',
        label: 'label',
        parent: undefined,
        children: [],
        synonymLabels: ['X', 'Y']
      };

      const child1: OntologyNode = {
        id: 'child1',
        label: 'label',
        parent: 'parent',
        children: [],
        synonymLabels: ['X', 'Y']
      };

      const child2: OntologyNode = {
        id: 'child2',
        label: 'label',
        parent: 'child1',
        children: [],
        synonymLabels: ['X', 'Y']
      };


      it('should create model', () => {

        const nodeMap = {
          [undefined as string]: { children: ['parent'] } as OntologyNode,
          'parent': parent,
          'child1': child1,
          'child2': child2
        };

        const expectedNodeMap = {
          'parent': parent,
          'child1': child1,
          'child2': child2
        };

        const model = createModel(nodeMap);
        expect(model.root).toEqual('parent');
        expect(model.nodes).toEqual(expectedNodeMap);
      });

      it('should link nodes to the parents', () => {

        const nodeMap = {
          'parent': parent,
          'child1': child1,
          'child2': child2
        };

        linkChildren(nodeMap);
        expect(nodeMap.parent.children).toEqual(['child1']);
        expect(nodeMap.child1.children).toEqual(['child2']);
        expect(nodeMap.child2.children).toEqual([]);
      });

      it('should add subtree node to accumulated', () => {


        const nodeMap = {
          'parent': parent,
          'child1': child1,
          'child2': child2
        };

        const acc = {
          'child1': child1
        };

        addSubtree(nodeMap, acc, child2);
        expect(acc['child2'].id).toBe('child2');
      });


    });

    describe('selectors', () => {
      describe('nodes', () => {
        it('returns an array of all ontology nodes', () => {
          expect(OntologyState.nodes(mockState)).toEqual(jasmine.arrayWithExactContents([node1, node2]));
        });
      });

      describe('rootNode', () => {
        it('returns the root node', () => {
          expect(OntologyState.rootNode(mockState)).toEqual(node1);
        });
      });
    });
  });
});
