import { RecursivePartial, Shallow } from 'shallow-render';

import { FlatNode } from '../../../core/models/flat-node';
import { OntologyNode } from '../../../core/models/ontology-node';
import { OntologyTreeComponent } from './ontology-tree.component';
import { OntologyTreeModule } from './ontology-tree.module';


function fromPartial<T>(partial: RecursivePartial<T>): T {
  return partial as T;
}


describe('OntologyTreeComponent', () => {
  const node1 = fromPartial<OntologyNode>({ label: 'label', children: ['child1', 'child2'] });
  const node2 = fromPartial<OntologyNode>({ label: 'label2', children: [] });
  const flatNode1 = new FlatNode(node1, 1);
  const flatNode2 = new FlatNode(node2, 1);

  let shallow: Shallow<OntologyTreeComponent>;

  beforeEach(() => {
    shallow = new Shallow(OntologyTreeComponent, OntologyTreeModule);
  });

  it('should check if the node is selected node or not', async () => {
    const { instance } = await shallow.render();
    instance.selectedNodes = [flatNode1];
    expect(instance.isSelected(flatNode1)).toBeTrue();
  });

  it('should check if the node is selected node or not', async () => {
    const { instance } = await shallow.render();
    instance.selectedNodes = [flatNode2];
    expect(instance.isSelected(flatNode1)).toBeFalse();
  });

  it('should set the current selection when a different node is selected', async () => {
    const { instance } = await shallow.render();

    instance.select(false, flatNode1, false, true);
    expect(instance.selectedNodes).toEqual([flatNode1]);
  });

  it('should clear the current selection when the same node is selected', async () => {
    const { instance } = await shallow.render();

    instance.selectedNodes = [flatNode1];
    instance.select(false, flatNode1, false, false);
    expect(instance.selectedNodes).toEqual([]);
  });

  it('should set selectedNodes to [] if called with an undefined node', async () => {
    const { instance } = await shallow.render();

    instance.select(false, undefined, false, false);
    expect(instance.selectedNodes).toEqual([]);
  });

  it('should push the selected node into selectedNodes if the ctrl is passed in as true', async () => {
    const { instance } = await shallow.render();

    instance.anySelectionsMade = true;
    instance.selectedNodes = [flatNode1];
    instance.select(true, flatNode2, false, true);

    expect(instance.selectedNodes).toEqual([flatNode1, flatNode2]);
  });

  it('should splice out the selected node from selectedNodes if the ctrl is passed in as true', async () => {
    const { instance } = await shallow.render();

    instance.anySelectionsMade = true;
    instance.selectedNodes = [flatNode1, flatNode2];
    instance.select(true, flatNode2, false, false);

    expect(instance.selectedNodes).toEqual([flatNode1]);
  });

  it('should emit when the selection changes', async () => {
    const { instance, outputs } = await shallow.render();
    instance.select(false, flatNode1, true, true);
    expect(outputs.nodeSelected.emit).toHaveBeenCalled();
  });

  it('isInnerNode should return true when a node can be expanded', async () => {
    const { instance } = await shallow.render();
    expect(instance.isInnerNode(1, flatNode1)).toBeTrue();
  });

  it('isInnerNode should return false when a node cannot be expanded', async () => {
    const { instance } = await shallow.render();
    expect(instance.isInnerNode(1, flatNode2)).toBeFalse();
  });
});
