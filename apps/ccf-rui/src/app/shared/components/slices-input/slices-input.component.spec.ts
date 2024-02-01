import { Shallow } from 'shallow-render';

import { SlicesInputComponent } from './slices-input.component';
import { SlicesInputModule } from './slices-input.module';

describe('SlicesInputComponent', () => {
  let shallow: Shallow<SlicesInputComponent>;

  beforeEach(() => {
    shallow = new Shallow(SlicesInputComponent, SlicesInputModule);
  });

  it('should update the values object with the passed in value', async () => {
    const { instance, outputs } = await shallow.render({
      bind: {
        slicesConfig: { thickness: NaN, numSlices: NaN }
      }
    });

    const mockEvent = { target: { value: 20 } } as unknown as KeyboardEvent;
    instance.updateSlicesData(mockEvent, 'thickness');

    expect(instance.slicesConfig.thickness).toBe(20);
    expect(outputs.slicesConfigChange.emit).toHaveBeenCalled();
  });

  it('should change all values to defaults when refreshSlices is called', async () => {
    const { instance, outputs } = await shallow.render({
      bind: {
        slicesConfig: { thickness: 100, numSlices: 50 }
      }
    });

    instance.refreshSlices();

    expect(instance.slicesConfig).toEqual({ thickness: NaN, numSlices: NaN });
    expect(outputs.slicesConfigChange.emit).toHaveBeenCalled();
  });
});
