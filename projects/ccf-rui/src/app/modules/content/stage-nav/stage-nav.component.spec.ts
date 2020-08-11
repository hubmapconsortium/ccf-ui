import { Shallow } from 'shallow-render';

import { StageNavComponent } from './stage-nav.component';
import { StageNavModule } from './stage-nav.module';

describe('StageNavComponent', () => {
  let shallow: Shallow<StageNavComponent>;

  beforeEach(() => {
    shallow = new Shallow(StageNavComponent, StageNavModule);
  });

  it('should properly update the currentSide variable when updateSide is called.', async () => {
    const { instance } = await shallow.render({ bind: { currentSide: 'left' }});
    instance.updateSide('right');

    expect(instance.currentSide).toEqual('right');
  });

  it('should emit the new side selection whenever updateSide is called.', async () => {
    const { instance, outputs } = await shallow.render();

    instance.updateSide('left');
    expect(outputs.currentSideChanged.emit).toHaveBeenCalled();
  });

  it('should properly update the currentView3D variable when updateView is called.', async () => {
    const { instance } = await shallow.render({ bind: { currentView3D: true }});
    instance.updateView(false);

    expect(instance.currentView3D).toBeFalse();
  });

  it('should emit the new view selection when updateView is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateView(true);

    expect(outputs.currentView3DChanged.emit).toHaveBeenCalled();
  });
});
