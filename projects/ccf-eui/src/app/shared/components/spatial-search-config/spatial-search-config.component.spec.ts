import { Shallow } from 'shallow-render';

import { SpatialSearchConfigComponent } from './spatial-search-config.component';
import { SpatialSearchConfigModule } from './spatial-search-config.module';

describe('SpatialSearchConfigComponent', () => {
  let shallow: Shallow<SpatialSearchConfigComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchConfigComponent, SpatialSearchConfigModule);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
