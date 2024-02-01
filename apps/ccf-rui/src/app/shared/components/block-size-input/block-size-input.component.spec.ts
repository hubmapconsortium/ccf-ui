import { Shallow } from 'shallow-render';

import { BlockSizeInputComponent } from './block-size-input.component';
import { BlockSizeInputModule } from './block-size-input.module';


describe('BlockSizeInputComponent', () => {
  let shallow: Shallow<BlockSizeInputComponent>;

  beforeEach(() => {
    shallow = new Shallow(BlockSizeInputComponent, BlockSizeInputModule);
  });

  it('should update the values object with the passed in value', async () => {
    const { instance, outputs } = await shallow.render({
      bind: {
        blockSize: { x: 10, y: 10, z: 10 }
      }
    });

    const mockEvent = { target: { value: 5 } } as unknown as KeyboardEvent;
    instance.updateBlockSizes(mockEvent, 'z');

    expect(instance.blockSize.z).toBe(5);
    expect(outputs.blockSizeChange.emit).toHaveBeenCalled();
  });

  it('should change all values to defaults when refreshBlockSize is called', async () => {
    const { instance, outputs } = await shallow.render({
      bind: {
        blockSize: { x: 10, y: 10, z: 10 }
      }
    });

    instance.refreshBlockSize();

    expect(instance.blockSize).toEqual({ x: 10, y: 10, z: 10 });
    expect(outputs.blockSizeChange.emit).toHaveBeenCalled();
  });
});
