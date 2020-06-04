import { Shallow } from 'shallow-render';

import { ImageViewerLegendComponent } from './image-viewer-legend.component';
import { ImageViewerLegendModule } from './image-viewer-legend.module';
import { ImageViewerLayer } from 'src/app/core/models/image-viewer-layer';

describe('ImageViewerLegendComponent', () => {
  let shallow: Shallow<ImageViewerLegendComponent>;

  beforeEach(() => {
      shallow = new Shallow(ImageViewerLegendComponent, ImageViewerLegendModule);
  });
});
