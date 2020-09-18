import { Shallow } from 'shallow-render';

import { TagListModule } from '../tag-list.module';
import { TagListItemComponent } from './item.component';


describe('TagListItemComponent', () => {
  let shallow: Shallow<TagListItemComponent>;

  beforeEach(() => {
    shallow = new Shallow(TagListItemComponent, TagListModule);
  });

  describe('.textColor', () => {
    it('returns the input item color', async () => {
      const { instance } = await shallow.render({ bind: { item: { color: 'white' } } });
      expect(instance.textColor).toEqual('white');
    });

    it('returns null if a color was not provided', async () => {
      const { instance } = await shallow.render({ bind: { item: {} } });
      expect(instance.textColor).toBeNull();
    });
  });
});
