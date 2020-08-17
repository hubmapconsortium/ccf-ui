import { Shallow } from 'shallow-render';

import { SideSelectorComponent } from './side-selector.component';
import { SideSelectorModule } from './side-selector.module';

describe('SideSelectorComponent', () => {
  let shallow: Shallow<SideSelectorComponent>;

  beforeEach(() => {
    shallow = new Shallow(SideSelectorComponent, SideSelectorModule);
  });

  it('should emit the side whenever updateSide is called.', async () => {
    const { instance, outputs } = await shallow.render({ bind: { left: true } });
    instance.updateSide(false);
    expect(outputs.sideChanged.emit).toHaveBeenCalledWith('right');
    instance.updateSide(true);
    expect(outputs.sideChanged.emit).toHaveBeenCalledWith('left');
  });

});
