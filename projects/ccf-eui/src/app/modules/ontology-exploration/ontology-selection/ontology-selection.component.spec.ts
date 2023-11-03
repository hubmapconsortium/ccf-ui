import { Store } from '@ngxs/store';
import { OntologyTreeNode } from 'ccf-database';
import { of } from 'rxjs';
import { RecursivePartial, Shallow } from 'shallow-render';

import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service';
import { OntologyTreeComponent } from '../ontology-tree/ontology-tree.component';
import { OntologySelectionComponent } from './ontology-selection.component';
import { OntologySelectionModule } from './ontology-selection.module';


function fromPartial<T>(partial: RecursivePartial<T>): T {
  return partial as T;
}


describe('OntologySelectionComponent', () => {
  const ontologyNode = fromPartial<OntologyTreeNode>({ label: 'label' });

  let shallow: Shallow<OntologySelectionComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj<Store>(['selectSnapshot']);
    mockStore.selectSnapshot.and.returnValue({ node: ontologyNode });

    shallow = new Shallow(OntologySelectionComponent, OntologySelectionModule)
      .provide(OntologySearchService)
      .mock(Store, mockStore)
      .mock(OntologySearchService, { rootNode$: of(fromPartial<OntologyTreeNode>({})) })
      .mock(OntologyTreeComponent, { expandAndSelect: () => undefined });
  });

  it('should expand the selected node', async () => {
    const { findComponent, instance } = await shallow.render();
    const tree = findComponent(OntologyTreeComponent);
    const spy = tree.expandAndSelect;

    instance.selected(ontologyNode);
    expect(spy).toHaveBeenCalled();
  });

  it('should call filterNodes method when selectedBiomarkerOptions triggers', async () => {
    const { findComponent, instance } = await shallow.render();
    instance.treeModel = {
      root: '',
      nodes: {}
    };
    spyOn(instance, 'filterNodes').and.callThrough();
    findComponent(OntologyTreeComponent).selectedBiomarkerOptions.emit(['gene']);
    expect(instance.filterNodes).toHaveBeenCalled();
  });

});
