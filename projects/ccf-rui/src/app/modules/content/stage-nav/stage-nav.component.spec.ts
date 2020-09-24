import { Shallow } from 'shallow-render';

import { StageNavComponent } from './stage-nav.component';
import { StageNavModule } from './stage-nav.module';

describe('StageNavComponent', () => {
  let shallow: Shallow<StageNavComponent>;

  beforeEach(() => {
    shallow = new Shallow(StageNavComponent, StageNavModule);
  });

  it('should properly update the side variable when updateSide is called.', async () => {
    const { instance } = await shallow.render({ bind: { side: 'left' }});
    instance.updateSide('right');

    expect(instance.side).toEqual('right');
  });

  it('should emit the new side selection whenever updateSide is called.', async () => {
    const { instance, outputs } = await shallow.render();

    instance.updateSide('left');
    expect(outputs.sideChange.emit).toHaveBeenCalled();
  });

  it('should properly update the view3D variable when updateView is called.', async () => {
    const { instance } = await shallow.render({ bind: { view3D: true }});
    instance.updateView(false);

    expect(instance.view3D).toBeFalse();
  });

  it('should emit the new view selection when updateView is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateView(true);

    expect(outputs.view3DChange.emit).toHaveBeenCalled();
  });

  it('should toggle stageNavHidden when toggleNav is called', async () => {
    const { instance } = await shallow.render();
    instance.toggleNav();
    expect(instance.stageNavHidden).toBeTrue();
  });
});
