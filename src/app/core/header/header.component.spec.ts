import { Shallow } from 'shallow-render';

import { HeaderComponent } from './header.component';
import { HeaderModule } from './header.module';

describe('HeaderComponent', () => {
  let shallow: Shallow<HeaderComponent>;

  beforeEach(() => {
    shallow = new Shallow(HeaderComponent, HeaderModule);
  });
});
