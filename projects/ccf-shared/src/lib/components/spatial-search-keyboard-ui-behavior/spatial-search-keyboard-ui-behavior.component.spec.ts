import { Shallow } from 'shallow-render';

import { SpatialSearchKeyboardUIBehaviorComponent } from './spatial-search-keyboard-ui-behavior.component';
import { SpatialSearchKeyboardUIBehaviorModule } from './spatial-search-keyboard-ui-behavior.module';

describe('SpatialSearchKeyboardUIBehaviorComponent', () => {
  let shallow: Shallow<SpatialSearchKeyboardUIBehaviorComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchKeyboardUIBehaviorComponent, SpatialSearchKeyboardUIBehaviorModule);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
