import { Shallow } from 'shallow-render';

import { LabeledSideToggleComponent } from './labeled-side-toggle.component';
import { LabeledSideToggleModule } from './labeled-side-toggle.module';

describe('LabeledSideToggleComponent', () => {
  let shallow: Shallow<LabeledSideToggleComponent>;

  beforeEach(() => {
    shallow = new Shallow(LabeledSideToggleComponent, LabeledSideToggleModule);
  });

  it('should emit the correct gender whenever updateGender is called.', async () => {
    const { instance, outputs } = await shallow.render({ bind: { isMale: true } });
    instance.updateGender(true);
    expect(outputs.genderChanged.emit).toHaveBeenCalledWith('female');
    instance.updateGender(false);
    expect(outputs.genderChanged.emit).toHaveBeenCalledWith('male');
  });

  it('should emit the correct side whenever updateSide is called.', async () => {
    const { instance, outputs } = await shallow.render({ bind: { left: true } });
    instance.updateSide(true);
    expect(outputs.sideChanged.emit).toHaveBeenCalledWith('right');
    instance.updateSide(false);
    expect(outputs.sideChanged.emit).toHaveBeenCalledWith('left');
  });

});
