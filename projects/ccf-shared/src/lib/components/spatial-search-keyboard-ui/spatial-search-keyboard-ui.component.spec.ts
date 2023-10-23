import { Shallow } from 'shallow-render';

import { SpatialSearchKeyboardUIComponent } from './spatial-search-keyboard-ui.component';
import { SpatialSearchKeyboardUIModule } from './spatial-search-keyboard-ui.module';

describe('SpatialSearchKeyboardUIComponent', () => {
  let shallow: Shallow<SpatialSearchKeyboardUIComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchKeyboardUIComponent, SpatialSearchKeyboardUIModule);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
