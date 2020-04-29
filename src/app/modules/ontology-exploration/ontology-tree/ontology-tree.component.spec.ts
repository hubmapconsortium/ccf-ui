import { RecursivePartial, Shallow } from 'shallow-render';

import { FlatNode } from '../../../core/models/flat-node';
import { OntologyNode } from '../../../core/models/ontology-node';
import { OntologyTreeComponent } from './ontology-tree.component';
import { OntologyTreeModule } from './ontology-tree.module';


function fromPartial<T>(partial: RecursivePartial<T>): T {
  return partial as T;
}


describe('OntologyTreeComponent', () => {
  const node1 = new FlatNode(fromPartial<OntologyNode>({ label: 'label', children:['child1', 'child2'] }), 1);
  const node2 = new FlatNode(fromPartial<OntologyNode>({ label: 'label2', children:[]  }), 1);

  let shallow: Shallow<OntologyTreeComponent>;

  beforeEach(() => {
    shallow = new Shallow(OntologyTreeComponent, OntologyTreeModule);
  });

  it('should check if the node is selected node or not', async () => {
    const { instance } = await shallow.render();
    instance.selectedNode = node1;
    expect(instance.isSelected(node1)).toBeTrue();
  });

  it('should check if the node is selected node or not', async () => {
    const { instance } = await shallow.render();
    instance.selectedNode = node2;
    expect(instance.isSelected(node1)).toBeFalse();
  });

  it('should check if the node can be expanded', async () => {
    const { instance } = await shallow.render();
    expect(instance.isInnerNode(1, node1)).toBeTrue();
  });

  it('should check if the node can be expanded 2', async () => {
    const { instance } = await shallow.render();
    expect(instance.isInnerNode(1, node2)).toBeFalse();
  });

  it('should set the current selection when a different node is selected', async () => {
    const { instance, outputs } = await shallow.render();

    instance.select(node1);
    expect(instance.selectedNode).toBe(node1);
    expect(outputs.nodeSelected.emit).toHaveBeenCalledWith(node1.original);
  });

  it('should clear the current selection when the same node is selected', async () => {
    const { instance, outputs } = await shallow.render();

    instance.selectedNode = node1;
    instance.select(node1);
    expect(instance.selectedNode).toBeUndefined();
    expect(outputs.nodeSelected.emit).toHaveBeenCalledWith(undefined);
  });
});
