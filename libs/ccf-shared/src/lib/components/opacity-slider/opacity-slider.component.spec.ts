import { Shallow } from 'shallow-render';

import { OpacitySliderComponent } from './opacity-slider.component';
import { OpacitySliderModule } from './opacity-slider.module';

describe('OpacitySliderComponent', () => {
  let shallow: Shallow<OpacitySliderComponent>;

  beforeEach(() => {
    shallow = new Shallow(OpacitySliderComponent, OpacitySliderModule);
  });

  it('should initialize prevOpacity to 0 if item is visible', async () => {
    const { instance } = await shallow.render({ bind: { visible: true } });
    expect(instance.prevOpacity).toEqual(0);
  });

  it('should initialize prevOpacity to 20 if item is hidden', async () => {
    const { instance } = await shallow.render({ bind: { visible: false } });
    expect(instance.prevOpacity).toEqual(20);
  });

  it('should emit opacityReset when the opacity refresh button is clicked', async () => {
    const { instance, outputs } = await shallow.render();
    instance.resetOpacity();
    expect(outputs.opacityReset.emit).toHaveBeenCalled();
  });

  it('should emit visibilityToggle when toggleVisibility is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.toggleVisibility();
    expect(outputs.visibilityToggle.emit).toHaveBeenCalled();
  });

  it('should reset the opacity to 20', async () => {
    const { instance } = await shallow.render();
    instance.reset();
    expect(instance.prevOpacity).toEqual(20);
  });

});
