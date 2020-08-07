import { Shallow } from 'shallow-render';

import { BlockSizeInputComponent } from './block-size-input.component';
import { BlockSizeInputModule } from './block-size-input.module';

describe('BlockSizeInputComponent', () => {
  let shallow: Shallow<BlockSizeInputComponent>;

  beforeEach(() => {
    shallow = new Shallow(BlockSizeInputComponent, BlockSizeInputModule);
  });

  it('should update the values object with the passed in value', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.tissueData = {width: 10, height: 10, depth: 10};
    const mockEvent = { target: {value: 5} } as unknown as InputEvent;
    instance.updateTissueData(mockEvent, 'depth');
    expect(instance.tissueData.depth).toBe(5);
    expect(outputs.valuesChange.emit).toHaveBeenCalled();
  });

  it('should change all values to defaults when refreshBlockSize is called', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.tissueData = {width: 5, height: 5, depth: 5};
    instance.refreshBlockSize();
    expect(instance.tissueData).toEqual({width: 10, height: 10, depth: 10});
    expect(outputs.valuesChange.emit).toHaveBeenCalled();
  });
});
