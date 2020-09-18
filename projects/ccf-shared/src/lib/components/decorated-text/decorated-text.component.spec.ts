import { Shallow } from 'shallow-render';

import { DecoratedTextComponent } from './decorated-text.component';
import { DecoratedTextModule } from './decorated-text.module';


describe('DecoratedTextComponent', () => {
  let shallow: Shallow<DecoratedTextComponent>;

  beforeEach(() => {
    shallow = new Shallow(DecoratedTextComponent, DecoratedTextModule);
  });

  describe('.segments', () => {
    it('is updated when the text changes', async () => {
      const { instance, fixture, bindings } = await shallow.render({ bind: { text: 'abc' } });
      const oldSegments = instance.segments;

      bindings.text = 'def';
      fixture.detectChanges();

      expect(instance.segments).not.toBe(oldSegments);
    });

    it('updates when decorations changes', async () => {
      const decorations = [{ start: 1 }];
      const { instance, fixture, bindings } = await shallow.render({ bind: { decorations } });
      const oldSegments = instance.segments;

      bindings.decorations = [{ start: 2 }];
      fixture.detectChanges();

      expect(instance.segments).not.toBe(oldSegments);
    });

    it('does not update if neither text or decorations changes', async () => {
      const { instance } = await shallow.render();
      const oldSegments = instance.segments;

      instance.ngOnChanges({});
      expect(instance.segments).toBe(oldSegments);
    });

    it('has a single item when there are no decorations', async () => {
      const { instance } = await shallow.render({ bind: { text: 'abc', decorations: [] } });
      expect(instance.segments.length).toEqual(1);
    });

    it('ignores empty ranges', async () => {
      const decorations = [{ start: 1, end: 1 }];
      const { instance } = await shallow.render({ bind: { text: 'abc', decorations } });
      expect(instance.segments.length).toEqual(1);
    });

    it('ignores out of bounds ranges', async () => {
      const decorations = [{ start: 10, end: 20 }];
      const { instance } = await shallow.render({ bind: { text: 'abc', decorations } });
      expect(instance.segments.length).toEqual(1);
    });

    it('has at one segment for each decorated area', async () => {
      const text = 'This is a sentence';
      const decorations = [{ start: 5 }];
      const { instance } = await shallow.render({ bind: { text, decorations } });
      expect(instance.segments.length).toEqual(2);
    });

    it('has multiple segments when there is overlap between decorated areas', async () => {
      const text = 'This is a sentence';
      const decorations = [{ end: 7 }, { start: 5, end: 10 }];
      const { instance } = await shallow.render({ bind: { text, decorations } });
      // Expected number of segments: 4
      // One for each `..` in 0..5..7..10..18
      expect(instance.segments.length).toEqual(4);
    });
  });
});
