import { Shallow } from 'shallow-render';

import { TagListModule } from '../tag-list.module';
import { TagListComponent } from './list.component';


describe('TagListComponent', () => {
  let shallow: Shallow<TagListComponent>;

  beforeEach(() => {
    shallow = new Shallow(TagListComponent, TagListModule);
  });

  describe('itemId(index, item)', () => {
    it('returns the tag as the identifier', async () => {
      const { instance } = await shallow.render();
      const id = instance.itemId(0, { tag: 'foo' });
      expect(id).toEqual('foo');
    });
  });

  describe('removeItem(item)', () => {
    const items = [{ tag: 'a' }, { tag: 'b' }];

    it('removes the item from the items array', async () => {
      const { instance } = await shallow.render({ bind: { items } });
      instance.removeItem(items[1]);
      expect(instance.items).not.toContain(items[1]);
    });

    it('emits the removed item', async () => {
      const { instance, outputs } = await shallow.render({ bind: { items } });
      instance.removeItem(items[0]);
      expect(outputs.itemRemoved.emit).toHaveBeenCalledWith(items[0]);
    });

    it('emits the new array of items', async () => {
      const { instance, outputs } = await shallow.render({ bind: { items } });
      instance.removeItem(items[1]);
      expect(outputs.itemsChange.emit).toHaveBeenCalledWith(items.slice(0, 1));
    });
  });
});
