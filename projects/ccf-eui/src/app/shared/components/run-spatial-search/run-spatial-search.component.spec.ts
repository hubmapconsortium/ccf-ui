import { Shallow } from 'shallow-render';

import { RunSpatialSearchComponent } from './run-spatial-search.component';
import { RunSpatialSearchModule } from './run-spatial-search.module';

describe('RunSpatialSearchComponent', () => {
  let shallow: Shallow<RunSpatialSearchComponent>;

  beforeEach(() => {
    shallow = new Shallow(RunSpatialSearchComponent, RunSpatialSearchModule);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
