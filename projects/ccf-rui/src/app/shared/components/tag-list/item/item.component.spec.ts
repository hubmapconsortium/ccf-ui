import { Shallow } from 'shallow-render';

import { TagListModule } from '../tag-list.module';
import { TagListItemComponent } from './item.component';


describe('TagListItemComponent', () => {
  let shallow: Shallow<TagListItemComponent>;

  beforeEach(() => {
    shallow = new Shallow(TagListItemComponent, TagListModule);
  });
});
