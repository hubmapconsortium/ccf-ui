import { Shallow } from 'shallow-render';

import { Tag } from '../../../core/models/anatomical-structure-tag';
import { TagListComponent } from './tag-list.component';
import { TagListModule } from './tag-list.module';


describe('TagListComponent', () => {
  let shallow: Shallow<TagListComponent>;

  beforeEach(() => {
    shallow = new Shallow(TagListComponent, TagListModule);
  });

  describe('tagId(index, tag)', () => {
    it('returns the tag as the identifier', async () => {
      const { instance } = await shallow.render();
      const id = instance.tagId(0, { id: 1, label: 'foo', type: 'assigned' });
      expect(id).toEqual(1);
    });
  });

  describe('tagClasses(tag)', () => {
    it('returns ["added"] if the type is added', async () => {
      const { instance } = await shallow.render();
      const classes = instance.tagClasses({ id: 1, label: '', type: 'added' });
      expect(classes).toEqual(['added']);
    });

    it('returns ["assigned"] if the type is assigned', async () => {
      const { instance } = await shallow.render();
      const classes = instance.tagClasses({ id: 1, label: '', type: 'assigned' });
      expect(classes).toEqual(['assigned']);
    });
  });

  describe('removeTag(tag)', () => {
    const tags: Tag[] = [
      { id: 1, label: 'a', type: 'assigned' },
      { id: 2, label: 'b', type: 'added' }
    ];

    it('removes the tag from the tags array', async () => {
      const { instance } = await shallow.render({ bind: { tags } });
      instance.removeTag(tags[1]);
      expect(instance.tags).not.toContain(tags[1]);
    });

    it('emits the removed tag', async () => {
      const { instance, outputs } = await shallow.render({ bind: { tags } });
      instance.removeTag(tags[0]);
      expect(outputs.tagRemoved.emit).toHaveBeenCalledWith(tags[0]);
    });

    it('emits the new array of tags', async () => {
      const { instance, outputs } = await shallow.render({ bind: { tags } });
      instance.removeTag(tags[1]);
      expect(outputs.tagsChange.emit).toHaveBeenCalledWith(tags.slice(0, 1));
    });
  });
});
