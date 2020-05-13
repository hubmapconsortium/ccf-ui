import { Shallow } from 'shallow-render';

import { ColorSchemeContentsComponent } from './color-scheme-contents.component';
import { ColorSchemeContentsModule } from './color-scheme-contents.module';
import { ColorScheme } from '.././color-scheme-popup/color-scheme-popup.component';

describe('ColorSchemeContentsComponent', () => {
  let shallow: Shallow<ColorSchemeContentsComponent>;

  let mockScheme: jasmine.SpyObj<ColorScheme>;

  beforeEach(() => {
    shallow = new Shallow(ColorSchemeContentsComponent, ColorSchemeContentsModule);
  });

  it('should emit brightnessChange when brightness is changed', async () => {
    const { instance, outputs } = await shallow.render();
    instance.brightnessChanged();
    expect(outputs.brightnessChange.emit).toHaveBeenCalledWith([0, 100]);
  });

  it('should emit transparencyChange when transparency is changed', async () => {
    const { instance, outputs } = await shallow.render();
    instance.transparency = 0;
    instance.transparencyChanged();
    expect(outputs.transparencyChange.emit).toHaveBeenCalledWith(0);
  });

  it('should emit schemeChange when scheme is selected', async () => {
    const { instance, outputs } = await shallow
      .render({ bind: { schemeOptions: Array(8).fill(mockScheme)} });

    instance.schemeChanged(3);
    expect(outputs.colorSchemeChange.emit).toHaveBeenCalledWith(mockScheme);
    expect(instance.selected[3]).toBe(true);
  });

});
