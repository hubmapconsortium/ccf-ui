import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { OntologyNode, OntologyStateModel } from './ontology.model';
import { OntologyState } from './ontology.state';

describe('State', () => {
describe('Ontology', () => {
  const node1: OntologyNode = { id: 'node1', parent: undefined, children: ['node2'] };
  const node2: OntologyNode = { id: 'node2', parent: 'node1', children: [] };
  const mockState: OntologyStateModel = {
    root: node1.id,
    ids: [node1.id, node2.id],
    nodes: { [node1.id]: node1, [node2.id]: node2 }
  };

  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([OntologyState])]
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
  });

  describe('Actions', () => {
    // Additional tests
  });

  describe('Selectors', () => {
    describe('nodes', () => {
      it('returns an array of all ontology nodes', () => {
        expect(OntologyState.nodes(mockState)).toEqual(jasmine.arrayWithExactContents([node1, node2]));
      });
    });

    // Additional tests
  });
});
});
