import { Shallow } from 'shallow-render';

import { LabeledSlideToggleComponent } from './labeled-slide-toggle.component';
import { LabeledSlideToggleModule } from './labeled-slide-toggle.module';

describe('LabeledSlideToggleComponent', () => {
  let shallow: Shallow<LabeledSlideToggleComponent>;

  beforeEach(() => {
    shallow = new Shallow(LabeledSlideToggleComponent, LabeledSlideToggleModule);
  });

  it('should emit the first label option whenever updateToggle is called with true.', async () => {
    const { instance, outputs } = await shallow.render({bind: {labels: ['option1', 'option2']}});
    instance.updateToggle(true);
    expect(outputs.valueChange.emit).toHaveBeenCalledWith('option1');
  });

  it('should emit the second label option whenever updateToggle is called with false.', async () => {
    const { instance, outputs } = await shallow.render({bind: {labels: ['option1', 'option2']}});
    instance.updateToggle(false);
    expect(outputs.valueChange.emit).toHaveBeenCalledWith('option2');
  });

  it('should set left to false if input value matches second label option', async () => {
    const { instance } = await shallow.render({bind: {labels: ['option1', 'option2'], value: 'option2'}});
    expect(instance.left).toBeFalse();
  });

  it('should set left to true if input value matches first label option', async () => {
    const { instance } = await shallow.render({bind: {labels: ['option1', 'option2'], value: 'option1'}});
    expect(instance.left).toBeTrue();
  });

  it('should return the input value', async () => {
    const mockToggle = {
      labels: ['option1', 'option2'],
      value: 'option2'
    } as LabeledSlideToggleComponent;
    expect(mockToggle.value).toEqual('option2');
  });

});
