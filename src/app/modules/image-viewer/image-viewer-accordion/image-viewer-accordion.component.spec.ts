import { Shallow } from 'shallow-render';
import { ImageViewerLayersComponent } from '../image-viewer-layers/image-viewer-layers.component';

import { ImageViewerAccordionComponent } from './image-viewer-accordion.component';
import { ImageViewerAccordionModule } from './image-viewer-accordion.module';
import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';


describe('ImageViewerAccordionComponent', () => {
  let shallow: Shallow<ImageViewerAccordionComponent>;

  function getTestLayers(): ImageViewerLayer[] {
    return [
      {
        selected: true,
        label: 'Option 1',
        id: 1,
        colorScheme: {
          type: 'discrete',
          name: 'bluered',
          colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
          positions: [0, .166, .333, .5, .666, .833, 1]
        },
        color: '#2166AC',
        brightness: [20, 60],
        transparency: 100,
        customizedColor: false,
        selectionOrder: 0,
        defaultOrder: -1
      },
      {
        selected: true,
        label: 'Option 2',
        id: 2,
        colorScheme: {
          type: 'gradient',
          name: 'viridis',
          colors: ['#FFE31C', '#21908A', '#450B57'],
          positions: [0, .5, 1]
        },
        color: '#21908A',
        brightness: [20, 60],
        transparency: 100,
        customizedColor: false,
        selectionOrder: 0,
        defaultOrder: -1
      },
      {
        selected: true,
        label: 'Option 3',
        id: 3,
        colorScheme: {
          type: 'gradient',
          name: 'viridis',
          colors: ['#FFE31C', '#21908A', '#450B57'],
          positions: [0, .5, 1]
        },
        color: 'red',
        brightness: [20, 60],
        transparency: 100,
        customizedColor: false,
        selectionOrder: 0,
        defaultOrder: -1
      }
    ];
  }

  beforeEach(() => {
    shallow = new Shallow(ImageViewerAccordionComponent, ImageViewerAccordionModule);
  });

  it('should emit layersChanged if image viewer layers emits selectedLayers', async () => {
    const { findComponent, instance } = await shallow.render();
    const imageViewerLayers = findComponent(ImageViewerLayersComponent);
    imageViewerLayers.selectedLayers.emit();
    expect(instance.layersChanged.emit).toHaveBeenCalled();
  });
});
