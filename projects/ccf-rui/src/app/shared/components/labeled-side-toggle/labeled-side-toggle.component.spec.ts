import { Shallow } from 'shallow-render';

import { LabeledSideToggleComponent } from './labeled-side-toggle.component';
import { LabeledSideToggleModule } from './labeled-side-toggle.module';

describe('LabeledSideToggleComponent', () => {
  let shallow: Shallow<LabeledSideToggleComponent>;

  beforeEach(() => {
    shallow = new Shallow(LabeledSideToggleComponent, LabeledSideToggleModule);
  });

  it('should emit the first label option whenever updateToggle is called with true.', async () => {
    const { instance, outputs } = await shallow.render({bind: {dataType: 'test', labels: ['option1', 'option2']}});
    instance.updateToggle(true);
    expect(outputs.toggleChanged.emit).toHaveBeenCalledWith({dataType: 'test', value: 'option1'});
  });

  it('should emit the second label option whenever updateToggle is called with false.', async () => {
    const { instance, outputs } = await shallow.render({bind: {dataType: 'test', labels: ['option1', 'option2']}});
    instance.updateToggle(false);
    expect(outputs.toggleChanged.emit).toHaveBeenCalledWith({dataType: 'test', value: 'option2'});
  });

});
