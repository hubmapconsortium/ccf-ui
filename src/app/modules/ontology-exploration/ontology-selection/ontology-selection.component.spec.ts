import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { RecursivePartial, Shallow } from 'shallow-render';

import { OntologyNode } from '../../../core/models/ontology-node';
import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service';
import { SearchState } from '../../../core/store/search/search.state';
import { OntologySearchComponent } from '../ontology-search/ontology-search.component';
import { OntologyTreeComponent } from '../ontology-tree/ontology-tree.component';
import { OntologySelectionComponent } from './ontology-selection.component';
import { OntologySelectionModule } from './ontology-selection.module';


function fromPartial<T>(partial: RecursivePartial<T>): T {
  return partial as T;
}


describe('OntologySelectionComponent', () => {
  const ontologyNode = fromPartial<OntologyNode>({ label: 'label' });

  let shallow: Shallow<OntologySelectionComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj<Store>(['selectSnapshot']);
    mockStore.selectSnapshot.and.returnValue({ node: ontologyNode });

    shallow = new Shallow(OntologySelectionComponent, OntologySelectionModule)
      .provide(OntologySearchService, SearchState)
      .mock(Store, mockStore)
      .mock(OntologySearchService, { rootNode: of(fromPartial<OntologyNode>({})) });
  });

  it('should expand the selected node', async () => {
    const { findComponent, instance } = await shallow.render();
    const tree = findComponent(OntologyTreeComponent);
    const spy = spyOn(tree, 'expandAndSelect');

    instance.selected(ontologyNode);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle the search selection event', async () => {
    const { instance, findComponent } = await shallow.render();
    const searchComponent = findComponent(OntologySearchComponent);
    const spy = spyOn(instance, 'selected');

    searchComponent.selected.emit(ontologyNode);
    expect(spy).toHaveBeenCalledWith(ontologyNode);
  });
});
