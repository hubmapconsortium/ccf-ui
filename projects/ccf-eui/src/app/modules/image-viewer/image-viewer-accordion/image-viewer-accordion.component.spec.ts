import { Shallow } from 'shallow-render';
import { ImageViewerLayersComponent } from '../image-viewer-layers/image-viewer-layers.component';

import { ImageViewerAccordionComponent } from './image-viewer-accordion.component';
import { ImageViewerAccordionModule } from './image-viewer-accordion.module';

describe('ImageViewerAccordionComponent', () => {
  let shallow: Shallow<ImageViewerAccordionComponent>;

  beforeEach(() => {
    shallow = new Shallow(ImageViewerAccordionComponent, ImageViewerAccordionModule);
  });

  it('should emit layersChanged if image viewer layers emits selectedLayers', async () => {
    const { findComponent, instance } = await shallow.render();
    const imageViewerLayers = findComponent(ImageViewerLayersComponent);
    imageViewerLayers.layerChange.emit();
    expect(instance.layerChange.emit).toHaveBeenCalled();
  });
});
