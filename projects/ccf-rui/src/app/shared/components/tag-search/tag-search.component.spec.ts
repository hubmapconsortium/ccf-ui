import { Shallow } from 'shallow-render';

import { TagSearchComponent } from './tag-search.component';
import { TagSearchModule } from './tag-search.module';


describe('TagSearchComponent', () => {
  let shallow: Shallow<TagSearchComponent>;

  beforeEach(() => {
    shallow = new Shallow(TagSearchComponent, TagSearchModule);
  });
});
