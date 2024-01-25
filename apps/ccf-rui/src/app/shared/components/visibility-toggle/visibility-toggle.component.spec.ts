import { Shallow } from 'shallow-render';

import { VisibilityToggleComponent } from './visibility-toggle.component';
import { VisibilityToggleModule } from './visibility-toggle.module';

describe('VisibilityToggleComponent', () => {
  let shallow: Shallow<VisibilityToggleComponent>;

  beforeEach(() => {
    shallow = new Shallow(VisibilityToggleComponent, VisibilityToggleModule);
  });

  it('should toggle the visibility variable whenever toggleVisibility is called.', async () => {
    const { instance } = await shallow.render({ bind: { visible: true } });
    instance.visible = true;
    instance.toggleVisibility();

    expect(instance.visible).toBeFalse();
  });

  it('should emit the new value whenever toggleVisibility is called', async () => {
    const { instance, outputs } = await shallow.render({ bind: { toggleLabel: 'Visibility' } });
    instance.visible = false;
    instance.toggleVisibility();

    expect(outputs.visibilityChanged.emit).toHaveBeenCalledWith(true);
  });
});
