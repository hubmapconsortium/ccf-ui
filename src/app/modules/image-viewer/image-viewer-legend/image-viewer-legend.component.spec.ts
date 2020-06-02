import { Shallow } from 'shallow-render';

import { ImageViewerLegendComponent } from './image-viewer-legend.component';
import { ImageViewerLegendModule } from './image-viewer-legend.module';
import { ImageViewerLayer } from 'src/app/core/models/image-viewer-layer';

function getTestLayers(): ImageViewerLayer[] {
  const testLayerCommon = {
      selected: false,
      brightness: [20, 60],
      transparency: 100,
      customizedColor: false,
      selectionOrder: 0,
      defaultOrder: -1,
  };

  const layers: ImageViewerLayer[] = [
      {
          ...testLayerCommon,
          label: 'Option 1',
          id: 1,
          colorScheme: {
              type: 'discrete',
              name: 'bluered',
              colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
              positions: [0, .166, .333, .5, .666, .833, 1]
          },
          color: '#2166AC',
      } as ImageViewerLayer,
      {
          ...testLayerCommon,
          label: 'Option 2',
          id: 2,
          colorScheme: {
              type: 'gradient',
              name: 'viridis',
              colors: ['#FFE31C', '#21908A', '#450B57'],
              positions: [0, .5, 1]
          },
          color: 'orange',
      } as ImageViewerLayer
  ];
  return layers;
}

describe('ImageViewerLegendComponent', () => {
  let shallow: Shallow<ImageViewerLegendComponent>;

  beforeEach(() => {
      shallow = new Shallow(ImageViewerLegendComponent, ImageViewerLegendModule);
  });

  it('should generate the background text of a discrete colorScheme properly', async () => {
      const layers = getTestLayers();
      const { instance } = await shallow.render({ bind: { layers } });
      const layer = layers[0];
      layer.colorScheme.type = 'discrete';
      layer.color = 'red';
      const backgroundTestString = instance.getBackground(layer);

      expect(backgroundTestString).toBe('red');
  });

  it('should generate the background text of a gradient colorScheme properly', async () => {
      const layers = getTestLayers();
      const { instance } = await shallow.render({ bind: { layers } });
      const layer = layers[0];
      layer.colorScheme = {
          type: 'gradient',
          name: 'viridis',
          colors: ['#FFE31C', '#21908A', '#450B57'],
          positions: [0, .5, 1]
      };
      const backgroundTestString = instance.getBackground(layer);
      const correctBackgroundString = 'linear-gradient(to right, #FFE31C 0%, #21908A 50%, #450B57 100%)';

      expect(backgroundTestString).toBe(correctBackgroundString);
  });
});
