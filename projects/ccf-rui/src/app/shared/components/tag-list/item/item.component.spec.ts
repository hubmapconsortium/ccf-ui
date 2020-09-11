import { Shallow } from 'shallow-render';

import { TagListModule } from '../tag-list.module';
import { ItemComponent } from './item.component';


describe('ItemComponent', () => {
  let shallow: Shallow<ItemComponent>;

  beforeEach(() => {
    shallow = new Shallow(ItemComponent, TagListModule);
  });
});
