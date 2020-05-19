import { Shallow } from 'shallow-render';

import { ColorScheme } from '.././color-scheme-popup/color-scheme-popup.component';
import { ColorSchemeContentsComponent } from './color-scheme-contents.component';
import { ColorSchemeContentsModule } from './color-scheme-contents.module';

describe('ColorSchemeContentsComponent', () => {
  let shallow: Shallow<ColorSchemeContentsComponent>;

  beforeEach(() => {
    shallow = new Shallow(ColorSchemeContentsComponent, ColorSchemeContentsModule);
  });

  it('should emit brightnessChange when brightness is changed', async () => {
    const { instance, outputs } = await shallow.render();
    instance.brightness = [0, 100];
    instance.brightnessChanged();
    expect(outputs.brightnessChange.emit).toHaveBeenCalled();
  });

  it('should emit transparencyChange when transparency is changed', async () => {
    const { instance, outputs } = await shallow.render();
    instance.transparencyChanged();
    expect(outputs.transparencyChange.emit).toHaveBeenCalled();
  });

  // it('should emit schemeChange when scheme is selected', async () => {
  //   const { instance, outputs } = await shallow
  //     .render({ bind: { schemeOptions: Array(8).fill(mockScheme) } });

  //   instance.schemeChanged(3);
  //   expect(outputs.colorSchemeChange.emit).toHaveBeenCalledWith(mockScheme);
  //   expect(instance.schemeSelectedStatus[3]).toBe(true);
  // });

  it('should emit colorChange when colorChanged is called', async () => {
    const testScheme: ColorScheme = {
      type: 'discrete',
      name: 'test',
      colors: ['red', 'blue', 'yellow'],
      positions: [0, 1]
    };

    const testScheme2: ColorScheme = {
      type: 'discrete',
      name: 'test2',
      colors: ['orange', 'green', 'purple'],
      positions: [0, 1]
    };

    const options = [testScheme, testScheme2];
    const { instance, outputs } = await shallow.render({ bind: { colorScheme: testScheme, schemeOptions: options } });
    instance.colorChanged([0, 0]);
    expect(outputs.colorChange.emit).toHaveBeenCalledWith('red');
  });

});
