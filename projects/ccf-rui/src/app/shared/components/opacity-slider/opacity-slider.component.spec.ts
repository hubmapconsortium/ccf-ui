import { Shallow } from 'shallow-render';

import { OpacitySliderComponent } from './opacity-slider.component';
import { OpacitySliderModule } from './opacity-slider.module';

describe('OpacitySliderComponent', () => {
  let shallow: Shallow<OpacitySliderComponent>;

  beforeEach(() => {
    shallow = new Shallow(OpacitySliderComponent, OpacitySliderModule);
  });

  it('should emit the new opacity value when changeOpacity is called', async () => {
    const { instance, outputs} = await shallow.render();
    instance.changeOpacity('50');
    expect(outputs.opacityChange.emit).toHaveBeenCalledWith(50);
  });

  it('should emit opacityReset when the opacity refresh button is clicked', async () => {
    const { instance, outputs} = await shallow.render();
    instance.resetOpacity();
    expect(outputs.opacityReset.emit).toHaveBeenCalled();
  });

  it('should emit visibilityToggle when toggleVisibility is called', async () => {
    const { instance, outputs} = await shallow.render();
    instance.toggleVisibility();
    expect(outputs.visibilityToggle.emit).toHaveBeenCalled();
  });

});
