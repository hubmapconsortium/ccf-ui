import { Shallow } from 'shallow-render';

import { SpatialSearchListComponent } from './spatial-search-list.component';
import { SpatialSearchListModule } from './spatial-search-list.module';


describe('SpatialSearchListComponent', () => {
  let shallow: Shallow<SpatialSearchListComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchListComponent, SpatialSearchListModule);
  });

  // TODO
});
