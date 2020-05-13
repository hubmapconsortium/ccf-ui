import { Shallow } from 'shallow-render';

import { ColorSchemePopupComponent, ColorScheme } from './color-scheme-popup.component';
import { ColorSchemePopupModule } from './color-scheme-popup.module';

describe('FiltersContentComponent', () => {
  let shallow: Shallow<ColorSchemePopupComponent>;
  const testScheme: ColorScheme = {
    type: 'discrete',
    name: 'test',
    colors: ['test', 'test'],
    positions: [0, 1]
  };

  let mockHTMLElement: jasmine.SpyObj<HTMLElement>;

  beforeEach(() => {
    shallow = new Shallow(ColorSchemePopupComponent, ColorSchemePopupModule);
  });

  it('should emit colorSchemeChange when updateScheme is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateScheme(testScheme);
    expect(outputs.colorSchemeChange.emit).toHaveBeenCalled();
  });

  it('should emit colorChange when updateColor is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateColor('color');
    expect(outputs.colorChange.emit).toHaveBeenCalled();
  });

  it('should emit brightnessChange when updateBrightness is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.updateBrightness([0, 1]);
    expect(outputs.brightnessChange.emit).toHaveBeenCalled();
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

  it('should set popup visibility to false when close() is called on an element outside the popup', async () => {
    const { instance } = await shallow.mock(HTMLElement, mockHTMLElement).render();
    instance.open();
    instance.close(mockHTMLElement);
    expect(instance.popupVisible).toBe(false);
  });

  it('close() should return when the popup element is closed', async () => {
    const { instance } = await shallow.mock(HTMLElement, mockHTMLElement).render();
    instance.close(mockHTMLElement);
    expect(instance.popupVisible).toBe(false);
  });

});
