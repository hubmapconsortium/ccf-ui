import { Component, NgModule, Type } from '@angular/core';
import { Store } from '@ngxs/store';
import { Shallow } from 'shallow-render';
import { keyBy } from 'lodash';

import { OntologyService } from './ontology.service';
import { OntologyNode } from '../../state/ontology/ontology.model';
import { take } from 'rxjs/operators';

@Component({ selector: 'ccf-test', template: '' })
class TestComponent { }

@NgModule({ declarations: [TestComponent], exports: [TestComponent] })
class TestModule { }

describe('OntologyService', () => {
  let get: <T>(type: Type<T>) => T;
  let service: OntologyService;
  let shallow: Shallow<TestComponent>;
  let store: Store;

  beforeEach(async () => {
    shallow = new Shallow(TestComponent, TestModule)
      .dontMock(OntologyService);

    ({ get } = await shallow.render());
    store = get(Store);
    service = get(OntologyService);
  });

  describe('rootNode', () => {
    const node = { id: 'root' } as OntologyNode;
    let valuePromise: Promise<OntologyNode>;

    beforeEach(() => {
      store.reset({ ontology: { root: node.id, nodes: { [node.id]: node } } });
      valuePromise = service.rootNode.pipe(take(1)).toPromise();
    });

    it('emits the root node of the tree', async () => {
      expect(await valuePromise).toEqual(node);
    });
  });

  describe('getChildren(node)', () => {
    const parent = { id: 'parent', children: ['child1', 'child2'] } as OntologyNode;
    const child1 = { id: 'child1' } as OntologyNode;
    const child2 = { id: 'child2' } as OntologyNode;
    const nodes = keyBy([parent, child1, child2], 'id');
    let result: OntologyNode[];

    beforeEach(() => {
      store.reset({ ontology: { nodes } });
      result = service.getChildren(parent);
    });

    it('fetches the child nodes', () => {
      expect(result).toEqual(jasmine.arrayContaining([child1, child2]));
    });

    it('can be called without \'this\'', () => {
      const getChildren = service.getChildren;
      expect(() => getChildren(parent)).not.toThrow();
    });
  });
});
