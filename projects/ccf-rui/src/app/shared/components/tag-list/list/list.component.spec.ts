import { Shallow } from 'shallow-render';

import { TagListModule } from '../tag-list.module';
import { TagListComponent } from './list.component';


describe('TagListComponent', () => {
  let shallow: Shallow<TagListComponent>;

  beforeEach(() => {
    shallow = new Shallow(TagListComponent, TagListModule);
  });
});
