import { Store } from '@ngxs/store';
import { OntologyTreeNode } from 'ccf-database';
import { of } from 'rxjs';
import { RecursivePartial, Shallow } from 'shallow-render';

import { OntologySearchService } from '../../../core/services/ontology-search/ontology-search.service'; //TODO: replace with CellTypeSearchService
import { CellTypeSearchComponent } from '../cell-type-search/cell-type-search.component';
import { CellTypeTreeComponent } from '../cell-type-tree/cell-type-tree.component';
import { CellTypeSelectionComponent } from './cell-type-selection.component';
import { CellTypeSelectionModule } from './cell-type-selection.module';


function fromPartial<T>(partial: RecursivePartial<T>): T {
  return partial as T;
}


describe('CellTypeSelectionComponent', () => {
  const ontologyNode = fromPartial<OntologyTreeNode>({ label: 'label' }); //TODO: replace with cellTypeNode

  let shallow: Shallow<CellTypeSelectionComponent>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj<Store>(['selectSnapshot']);
    mockStore.selectSnapshot.and.returnValue({ node: ontologyNode });

    shallow = new Shallow(CellTypeSelectionComponent, CellTypeSelectionModule)
      .provide(OntologySearchService)
      .mock(Store, mockStore)
      .mock(OntologySearchService, { rootNode: of(fromPartial<OntologyTreeNode>({})) })
      .mock(CellTypeTreeComponent, { expandAndSelect: () => undefined });
  });

  it('should expand the selected node', async () => {
    const { findComponent, instance } = await shallow.render();
    const tree = findComponent(CellTypeTreeComponent);
    const spy = tree.expandAndSelect;

    instance.selected(ontologyNode);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle the search selection event', async () => {
    const { instance, findComponent } = await shallow.render();
    const searchComponent = findComponent(CellTypeSearchComponent);
    const spy = spyOn(instance, 'selected');

    searchComponent.selected.emit(ontologyNode);
    expect(spy).toHaveBeenCalledWith(ontologyNode);
  });
});
