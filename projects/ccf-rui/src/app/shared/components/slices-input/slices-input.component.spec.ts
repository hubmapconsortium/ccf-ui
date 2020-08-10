import { Shallow } from 'shallow-render';

import { SlicesInputComponent } from './slices-input.component';
import { SlicesInputModule } from './slices-input.module';

describe('SlicesInputComponent', () => {
  let shallow: Shallow<SlicesInputComponent>;

  beforeEach(() => {
    shallow = new Shallow(SlicesInputComponent, SlicesInputModule);
  });

  it('should update the values object with the passed in value', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.slicesData = {thickness: NaN, numSlices: NaN};
    const mockEvent = { target: {value: 20} } as unknown as InputEvent;
    instance.updateSlicesData(mockEvent, 'thickness');
    expect(instance.slicesData.thickness).toBe(20);
    expect(outputs.valuesChange.emit).toHaveBeenCalled();
  });

  it('should change all values to defaults when refreshSlices is called', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.slicesData = {thickness: 100, numSlices: 50};
    instance.refreshSlices();
    expect(instance.slicesData).toEqual({thickness: NaN, numSlices: NaN});
    expect(outputs.valuesChange.emit).toHaveBeenCalled();
  });
});
