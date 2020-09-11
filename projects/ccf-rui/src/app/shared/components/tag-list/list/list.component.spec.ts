import { Shallow } from 'shallow-render';

import { TagListModule } from '../tag-list.module';
import { ListComponent } from './list.component';


describe('ListComponent', () => {
  let shallow: Shallow<ListComponent>;

  beforeEach(() => {
    shallow = new Shallow(ListComponent, TagListModule);
  });
});
