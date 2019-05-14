import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';

import { OntologyNode, OntologyStateModel } from './ontology.model';
import { OntologyState } from './ontology.state';

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
