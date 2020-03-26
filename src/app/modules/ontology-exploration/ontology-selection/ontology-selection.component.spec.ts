import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { Shallow } from 'shallow-render';
import { OntologyNode } from 'src/app/core/models/ontology-node';
import { OntologyState } from 'src/app/core/store/ontology/ontology.state';
import { SearchState } from 'src/app/core/store/search/search.state';

import { OntologyTreeComponent } from '../ontology-tree/ontology-tree.component';
import { OntologySelectionComponent } from './ontology-selection.component';
import { OntologySelectionModule } from './ontology-selection.module';

describe('OntologySelectionComponent', () => {
  let shallow: Shallow<OntologySelectionComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockTreeComponent: jasmine.SpyObj<OntologyTreeComponent>;
  const ontologyNode = {
    label: 'label'
  } as OntologyNode;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj<Store>(['selectSnapshot']);
    mockStore.selectSnapshot.and.returnValue({node: ontologyNode });
    mockTreeComponent = jasmine.createSpyObj<OntologyTreeComponent>(['expandAndSelect']);

    shallow = new Shallow(OntologySelectionComponent, OntologySelectionModule)
    .mock(Store, mockStore)
    .mock(OntologyTreeComponent, mockTreeComponent)
    .provide([
      { provide: SearchState, useValue: {} },
      { provide: HttpClient, useValue: {} },
      { provide: OntologyState, useValue: {} }
    ]);
  });

  it('should expand the selected node', async () => {
    const { instance } = await shallow.render();
    instance.tree = mockTreeComponent;
    instance.selected(ontologyNode);
    expect(mockTreeComponent.expandAndSelect).toHaveBeenCalled();
  });
});
