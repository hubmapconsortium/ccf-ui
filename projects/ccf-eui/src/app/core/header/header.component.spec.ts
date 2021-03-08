import { Shallow } from 'shallow-render';

import { HeaderComponent } from './header.component';
import { HeaderModule } from './header.module';

describe('HeaderComponent', () => {
  let shallow: Shallow<HeaderComponent>;
  const testFilter = { sex: 'Both', ageRange: [5, 99], bmiRange: [30, 80] };

  beforeEach(() => {
    shallow = new Shallow(HeaderComponent, HeaderModule);
  });

});
