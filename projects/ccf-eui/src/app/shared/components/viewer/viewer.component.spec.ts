import { Shallow } from 'shallow-render';
import { ViewerComponent } from './viewer.component';
import { ViewerModule } from './viewer.module';

describe('ViewerComponent', () => {
  let shallow: Shallow<ViewerComponent>;

  beforeEach(() => {
    shallow = new Shallow(ViewerComponent, ViewerModule);
  });

});
