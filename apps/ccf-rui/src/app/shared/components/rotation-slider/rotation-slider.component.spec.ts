import { Shallow } from 'shallow-render';

import { Rotation, RotationSliderComponent } from './rotation-slider.component';
import { RotationSliderModule } from './rotation-slider.module';


describe('RotationSliderComponent', () => {
  let shallow: Shallow<RotationSliderComponent>;

  beforeEach(() => {
    shallow = new Shallow(RotationSliderComponent, RotationSliderModule);
  });

  it('should emit the new value whenever changeRotation is called.', async () => {
    const rotation: Rotation = { x: 10, y: 10, z: 10 };
    const { instance, outputs } = await shallow.render({ bind: { rotation } });

    instance.changeRotation(0, 'x');
    expect(outputs.rotationChange.emit).toHaveBeenCalled();
  });

  it('shoud successfully update rotation using changeRotation given a string as input.', async () => {
    const rotation: Rotation = { x: 0, y: 0, z: 0 };
    const { instance } = await shallow.render({ bind: { rotation } });
    instance.changeRotation('10', 'x');

    expect(instance.rotation.x).toEqual(10);
  });

  it('should successfully update rotation using changeRotation given an integer as input.', async () => {
    const rotation: Rotation = { x: 1, y: 1, z: 1 };
    const { instance } = await shallow.render({ bind: { rotation } });
    instance.changeRotation('2', 'y');

    expect(instance.rotation.y).toEqual(2);
  });

  it('should emit the rotation change whenever resetRotation is called.', async () => {
    const { instance, outputs } = await shallow.render();
    instance.resetRotation('x');

    expect(outputs.rotationChange.emit).toHaveBeenCalled();
  });

  it('should set the rotation of X-axis to 0 when the resetRotation method is called.', async () => {
    const rotation: Rotation = { x: 100, y: 100, z: 100 };
    const { instance } = await shallow.render({ bind: { rotation } });
    instance.resetRotation('x');

    expect(instance.rotation.x).toEqual(0);
  });

  it('should set the rotation of Y-axis to 0 when the resetRotation method is called.', async () => {
    const rotation: Rotation = { x: 100, y: 100, z: 100 };
    const { instance } = await shallow.render({ bind: { rotation } });
    instance.resetRotation('y');

    expect(instance.rotation.y).toEqual(0);
  });

  it('should set the rotation of Z-axis to 0 when the resetRotation method is called.', async () => {
    const rotation: Rotation = { x: 100, y: 100, z: 100 };
    const { instance } = await shallow.render({ bind: { rotation } });
    instance.resetRotation('z');

    expect(instance.rotation.z).toEqual(0);
  });
});
