import { Shallow } from 'shallow-render';

import { SpatialSearchListComponent, SpatialSearchListItem } from './spatial-search-list.component';
import { SpatialSearchListModule } from './spatial-search-list.module';


describe('SpatialSearchListComponent', () => {
  const item1: SpatialSearchListItem = { selected: false, description: 'abc' };
  const item2: SpatialSearchListItem = { selected: true, description: 'def' };
  const items = [item1, item2];

  let shallow: Shallow<SpatialSearchListComponent<SpatialSearchListItem>>;

  beforeEach(() => {
    shallow = new Shallow(SpatialSearchListComponent, SpatialSearchListModule);
  });

  describe('itemId(index, item)', () => {
    it('returns an identifier', async () => {
      const { instance } = await shallow.render();
      expect(instance.itemId(0, item1)).toBeDefined();
    });

    it('returns different ids for different items', async () => {
      const { instance } = await shallow.render();
      const id1 = instance.itemId(0, item1);
      const id2 = instance.itemId(1, item2);

      expect(id1).not.toEqual(id2);
    });

    it('returns the same id for cloned items', async () => {
      const { instance } = await shallow.render();
      const clone = { ...item1 };
      const id1 = instance.itemId(0, item1);
      const id2 = instance.itemId(0, clone);

      expect(id1).toEqual(id2);
    });
  });

  describe('updateItemSelection(index, selection)', () => {
    it('sets the selection of the item at the index', async () => {
      const { instance } = await shallow.render({ bind: { items } });
      instance.updateItemSelection(0, true);
      expect(instance.items[0].selected).toBeTrue();
    });

    it('emits the new list', async () => {
      const { instance, outputs } = await shallow.render({ bind: { items } });
      instance.updateItemSelection(0, true);
      expect(outputs.selectionChanged.emit).toHaveBeenCalled();
    });
  });

  describe('removeItem(index)', () => {
    it('removes the item at the index', async () => {
      const { instance } = await shallow.render({ bind: { items } });
      instance.removeItem(0);
      expect(instance.items).toEqual([item2]);
    });

    it('emits the removed item', async () => {
      const { instance, outputs } = await shallow.render({ bind: { items } });
      instance.removeItem(0);
      expect(outputs.itemRemoved.emit).toHaveBeenCalledWith(item1);
    });
  });
});
