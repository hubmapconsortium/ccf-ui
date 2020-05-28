import { Shallow } from 'shallow-render';

import { DEFAULT_COLOR_SCHEMES } from '../../modules/color-scheme/color-schemes';
import { SchemeDropdownComponent } from './scheme-dropdown.component';
import { SchemeDropdownModule } from './scheme-dropdown.module';

describe('SchemeDropdownComponent', () => {
  let shallow: Shallow<SchemeDropdownComponent>;
  const schemes = DEFAULT_COLOR_SCHEMES;

  beforeEach(() => {
    shallow = new Shallow(SchemeDropdownComponent, SchemeDropdownModule);
  });

  it('should emit the appropriate scheme information when schemeChanged is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.schemeChanged(2);
    expect(outputs.schemeChange.emit).toHaveBeenCalledWith({ scheme: schemes[2], coloridx: 2 });
  });
});
