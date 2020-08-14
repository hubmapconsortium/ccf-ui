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
    instance.blockSizes = {x: 10, y: 10, z: 10};
    const mockEvent = { target: {value: 5} } as unknown as InputEvent;
    instance.updateBlockSizes(mockEvent, 'z');
    expect(instance.blockSizes.z).toBe(5);
    expect(outputs.valuesChange.emit).toHaveBeenCalled();
  });

  it('should change all values to defaults when refreshBlockSize is called', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.blockSizes = {x: 5, y: 5, z: 5};
    instance.refreshBlockSize();
    expect(instance.blockSizes).toEqual({x: 10, y: 10, z: 10});
    expect(outputs.valuesChange.emit).toHaveBeenCalled();
  });
});
