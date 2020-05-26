import { Shallow } from 'shallow-render';

import { ColorScheme } from '../color-schemes';
import { ColorSchemePopupComponent } from './color-scheme-popup.component';
import { ColorSchemePopupModule } from './color-scheme-popup.module';

describe('ColorSchemePopupComponent', () => {
  let shallow: Shallow<ColorSchemePopupComponent>;
  const testScheme: ColorScheme = {
    type: 'discrete',
    name: 'test',
    colors: ['color1', 'color2'],
    positions: [0, 1]
  };

  beforeEach(() => {
    shallow = new Shallow(ColorSchemePopupComponent, ColorSchemePopupModule);
  });

  it('should emit schemeChange when updateScheme is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateScheme(testScheme);
    expect(outputs.schemeChange.emit).toHaveBeenCalledWith({ scheme: testScheme, coloridx: 0 });
  });

  it('should emit schemeChange when updateColor is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateScheme(testScheme);
    instance.updateColor(1);
    expect(outputs.schemeChange.emit).toHaveBeenCalledWith({ scheme: testScheme, coloridx: 1 });
  });

  it('should emit brightnessChange when updateBrightness is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateBrightness([0, 1]);
    expect(outputs.brightnessChange.emit).toHaveBeenCalledWith([0, 1]);
  });

  it('should emit transparencyChange when updateTransparency is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateTransparency(50);
    expect(outputs.transparencyChange.emit).toHaveBeenCalled();
  });

  it('should set popup visibility to true when open() is called', async () => {
    const { instance } = await shallow.render();
    instance.popupVisible = false;
    instance.open();
    expect(instance.popupVisible).toBe(true);
  });

});
