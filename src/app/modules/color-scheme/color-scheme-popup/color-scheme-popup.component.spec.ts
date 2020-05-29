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

  it('should set popup visibility to true when open() is called', async () => {
    const { instance } = await shallow.render();
    instance.popupVisible = false;
    instance.open();
    expect(instance.popupVisible).toBe(true);
  });

});
