import { Shallow } from 'shallow-render';

import { SpatialSearchUiComponent } from './spatial-search-ui.component';
import { SpatialSearchUiModule } from './spatial-search-ui.module';

describe('SpatialSearchUiComponent', () => {
  let shallow: Shallow<SpatialSearchUiComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchUiComponent, SpatialSearchUiModule);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
