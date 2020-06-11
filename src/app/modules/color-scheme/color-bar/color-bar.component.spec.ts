import { Shallow } from 'shallow-render';

import { ColorScheme } from '../color-schemes';
import { ColorBarComponent } from './color-bar.component';
import { ColorBarModule } from './color-bar.module';

describe('ColorBarComponent', () => {
  let shallow: Shallow<ColorBarComponent>;

  const testScheme: ColorScheme = {
    type: 'discrete',
    name: 'test',
    colors: ['red', 'blue', 'yellow'],
    positions: [0, 0.5, 1]
  };

  const testScheme2: ColorScheme = {
    type: 'gradient',
    name: 'testgradient',
    colors: ['red', 'blue', 'yellow'],
    positions: [0, 0.5, 1]
  };

  beforeEach(() => {
    shallow = new Shallow(ColorBarComponent, ColorBarModule);
  });

  it('should generate the linear gradient css dynamically from gradient colors', async () => {
    const { instance } = await shallow.render({ bind: { colorScheme: testScheme2 } });
    expect(instance.gradientStyle).toBe('linear-gradient(to right, red 0%, blue 50%, yellow 100%)');
  });

  it('flags a gradient as selected when it is selected', async () => {
    const { instance } = await shallow.render({ bind: { colorScheme: testScheme2, selected: true } });
    expect(instance.gradientHighlight()).toBe(true);
  });

  it('should not emit a change even if a color changes when the selection is not enabled', async () => {
    const { instance, outputs } = await shallow.render({ bind: { colorScheme: testScheme2, selected: true } });
    instance.enableSelection = false;
    instance.colorChanged('red');

    expect(outputs.colorChange.emit).not.toHaveBeenCalled();
  });

  it('should properly set and emit values when a color changes while selection is enabled', async () => {
    const { instance, outputs } = await shallow.render({ bind: { colorScheme: testScheme2, selected: true } });
    instance.selected = false;
    instance.selectedColor = 'green';
    instance.enableSelection = true;
    instance.colorChanged('red');

    expect(instance.selected).toBeTrue();
    expect(instance.selectedColor).toBe('red');
    expect(outputs.colorChange.emit).toHaveBeenCalledWith('red');
  });
});
