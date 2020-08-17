import { Shallow } from 'shallow-render';

import { GenderSelectorComponent } from './gender-selector.component';
import { GenderSelectorModule } from './gender-selector.module';

describe('GenderSelectorComponent', () => {
  let shallow: Shallow<GenderSelectorComponent>;

  beforeEach(() => {
    shallow = new Shallow(GenderSelectorComponent, GenderSelectorModule);
  });

  it('should emit the gender whenever updateGender is called.', async () => {
    const { instance, outputs } = await shallow.render({ bind: { isMale: false } });
    instance.updateGender(true);
    expect(outputs.genderChanged.emit).toHaveBeenCalledWith('female');
    instance.updateGender(false);
    expect(outputs.genderChanged.emit).toHaveBeenCalledWith('male');
  });

});
