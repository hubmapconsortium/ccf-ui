import { Shallow } from 'shallow-render';

import { ImageViewerLayersComponent } from './image-viewer-layers.component';
import { ImageViewerLayersModule } from './image-viewer-layers.module';
import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';

function getTestLayers(): ImageViewerLayer[] {
  const layers: ImageViewerLayer[] = [
    {
      selected: false,
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
      selectionOrder: 0
    },
    {
      selected: false,
      label: 'Option 2',
      id: 2,
      colorScheme: {
        type: 'gradient',
        name: 'viridis',
        colors: ['#FFE31C', '#21908A', '#450B57'],
        positions: [0, .5, 1]
      },
      color: 'orange',
      brightness: [20, 60],
      transparency: 100,
      customizedColor: false,
      selectionOrder: 0
    },
    {
      selected: false,
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
      selectionOrder: 0
    }
  ];
  return layers;
}

describe('ImageViewerLayersComponent', () => {
  let shallow: Shallow<ImageViewerLayersComponent>;

  beforeEach(() => {
    shallow = new Shallow(ImageViewerLayersComponent, ImageViewerLayersModule);
  });

  it('should emit the active layer list when checkboxOnChange() is called', async () => {
    const layers = getTestLayers();
    const { instance, outputs } = await shallow.render({ bind: { layers } });
    instance.checkboxOnChange(layers[1]);
    expect(outputs.selectedLayers.emit).toHaveBeenCalled();
  });

  it('should properly sort layers with selectionOrder properties', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render({ bind: { layers } });

    layers[0].selected = true;
    layers[0].selectionOrder = 2;
    layers[1].selected = true;
    layers[1].selectionOrder = 1;
    layers[2].selected = true;
    layers[2].selectionOrder = 3;
    const activeLayers = instance.activeLayers();

    expect(activeLayers[0].label).toBe('Option 2');
    expect(activeLayers[1].label).toBe('Option 1');
  });

  it('should filter out unselected layers from the active layers list', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render({ bind: { layers } });

    layers[1].selected = true;
    layers[1].selectionOrder = 1;
    const activeLayers = instance.activeLayers();

    expect(activeLayers).toContain(layers[1]);
    expect(activeLayers).not.toContain(layers[0]);
  });

  it('should emit the layer list whenever a layer is updated', async () => {
    const layers = getTestLayers();
    const { instance, outputs } = await shallow.render({ bind: { layers }});

    instance.layerChange(layers[0], layers[0]);
    expect(outputs.selectedLayers.emit).toHaveBeenCalled();
  });
});
