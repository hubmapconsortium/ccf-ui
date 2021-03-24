import { DatasetResult } from 'ccf-database';
import { Shallow } from 'shallow-render';

import { ThumbnailCarouselComponent } from './thumbnail-carousel.component';
import { ThumbnailCarouselModule } from './thumbnail-carousel.module';


function castPartial<T>(partial: Partial<T>): T {
  return partial as T;
}


describe('ThumbnailCarouselComponent', () => {
  let shallow: Shallow<ThumbnailCarouselComponent>;

  beforeEach(() => {
    shallow = new Shallow(ThumbnailCarouselComponent, ThumbnailCarouselModule);
  });

  describe('itemId(index, item)', () => {
    it('returns an identifier', async () => {
      const { instance } = await shallow.render();
      const result = instance.itemId(0, castPartial<DatasetResult>({ thumbnail: 'abc' }));
      expect(result).toEqual('abc');
    });
  });
});
