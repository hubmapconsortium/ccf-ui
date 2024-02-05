import { normalize } from './decorated-range';
import { DecoratedRange } from './decorated-text.component';

describe('DecoratedRange', () => {
  describe('normalize(range, length)', () => {
    const partial: Partial<DecoratedRange> = {
      start: 3,
      end: -5,
      classes: ['foo'],
      styles: { color: 'yellow' }
    };

    it('fills any undefined fields with defaults', () => {
      const result = normalize({}, 10);
      expect(result.start).toBeDefined();
      expect(result.end).toBeDefined();
      expect(result.classes).toBeDefined();
      expect(result.styles).toBeDefined();
    });

    it('copies existing properties', () => {
      const result = normalize(partial, 10);
      expect(result.classes).toEqual(partial.classes as string[]);
      expect(result.styles).toEqual(partial.styles!);
    });

    it('handles negative indices for start and end', () => {
      const result = normalize(partial, 10);
      expect(result.end).toEqual(5);
    });

    it('constrains indices', () => {
      const result = normalize(partial, 2);
      expect(result.start).toEqual(2);
      expect(result.end).toEqual(0);
    });
  });
});
