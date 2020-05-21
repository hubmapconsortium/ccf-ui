import { Shallow } from 'shallow-render';

import { ColorScheme, DEFAULT_COLOR_SCHEMES } from '../color-schemes';
import { ColorSchemeContentsComponent } from './color-scheme-contents.component';
import { ColorSchemeContentsModule } from './color-scheme-contents.module';

describe('ColorSchemeContentsComponent', () => {
  let shallow: Shallow<ColorSchemeContentsComponent>;

  const testScheme: ColorScheme = {
    type: 'discrete',
    name: 'test',
    colors: ['red', 'blue', 'yellow'],
    positions: [0, 1]
  };

  beforeEach(() => {
    shallow = new Shallow(ColorSchemeContentsComponent, ColorSchemeContentsModule);
  });

  it('should emit the new scheme when scheme is changed', async () => {
    const { instance, outputs } = await shallow.render({ bind: { schemeOptions: DEFAULT_COLOR_SCHEMES } });
    instance.schemeChanged(1);
    expect(outputs.colorSchemeChange.emit).toHaveBeenCalledWith(DEFAULT_COLOR_SCHEMES[1]);
  });

  it('should emit brightnessChange when brightness is changed', async () => {
    const { instance, outputs } = await shallow.render({ bind: { schemeOptions: DEFAULT_COLOR_SCHEMES } });
    instance.brightnessChanged();
    expect(outputs.brightnessChange.emit).toHaveBeenCalled();
  });

  it('should emit transparencyChange when transparency is changed', async () => {
    const { instance, outputs } = await shallow.render({ bind: { schemeOptions: DEFAULT_COLOR_SCHEMES } });
    instance.transparencyChanged();
    expect(outputs.transparencyChange.emit).toHaveBeenCalled();
  });

  it('should emit colorChange when colorChanged is called', async () => {
    const { instance, outputs } = await shallow.render({ bind: { colorScheme: testScheme, schemeOptions: DEFAULT_COLOR_SCHEMES } });
    instance.colorChanged(instance.colorScheme.colors[0]);
    expect(outputs.colorChange.emit).toHaveBeenCalledWith('red');
  });

});
