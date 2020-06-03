import { Shallow } from 'shallow-render';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';
import { ColorScheme } from '../../../modules/color-scheme/color-schemes';
import { ImageViewerLayersComponent } from './image-viewer-layers.component';
import { ImageViewerLayersModule } from './image-viewer-layers.module';
import { async } from '@angular/core/testing';

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
      selectionOrder: 0,
      defaultOrder: -1
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
      color: '#21908A',
      brightness: [20, 60],
      transparency: 100,
      customizedColor: false,
      selectionOrder: 0,
      defaultOrder: -1
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
      selectionOrder: 0,
      defaultOrder: -1
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

  it('should call handleUnselect when checkboxOnChange() is called on a selected layer', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render({ bind: { layers }});
    layers[1].selected = true;
    const spy = spyOn(instance, 'handleUnselect');
    instance.checkboxOnChange(layers[1]);
    expect(spy).toHaveBeenCalledWith(layers[1]);
  });

  it('filters out unselected layers, then sorts the remaining layers when activeLayers() is called', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render({ bind: { layers }});
    const firstlayer = layers[0];
    const secondlayer = layers[1];
    const thirdlayer = layers[2];
    secondlayer.selected = true;
    secondlayer.selectionOrder = 1;
    thirdlayer.selected = true;
    thirdlayer.selectionOrder = 3;
    firstlayer.selected = true;
    firstlayer.selectionOrder = 2;
    expect(instance.activeLayers()).toEqual([secondlayer, firstlayer, thirdlayer]);
  });

  it('should reorder the color assignment array if a layer becomes customized', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render({ bind: { layers }});
    layers[0].customizedColor = true;
    const spy = spyOn(instance, 'reorderAssignment');
    instance.layerChange(layers[0], layers[0]);
    expect(spy).toHaveBeenCalledWith(layers[0]);
  });

  it('should not reorder the color assignment array if a layer was not customized', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render({ bind: { layers }});
    layers[0].customizedColor = false;
    const spy = spyOn(instance, 'reorderAssignment');
    instance.layerChange(layers[0], layers[0]);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should make customizedColor false if a customized layer is unselected', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render();
    layers[0].customizedColor = true;
    instance.handleUnselect(layers[0]);
    expect(layers[0].customizedColor).toBe(false);
  });

  it('should reorder the color assignment array if a non-customized layer is unselected', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render();
    const spy = spyOn(instance, 'reorderAssignment');
    instance.handleUnselect(layers[0]);
    expect(spy).toHaveBeenCalledWith(layers[0]);
  });

  it('should update assignmentOrder when reorderAssignment is called', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render();
    layers[0].defaultOrder = 5;
    instance.assignmentOrder = [4,0,1,2,3,6];
    instance.reorderAssignment(layers[0]);
    expect(instance.assignmentOrder).toEqual([4,2,5,1,3,6,0]);
  });

  it('should update the default scheme if selected from the scheme dropdown', async () => {
    const layers = getTestLayers();
    const testScheme = {
      type: 'discrete',
      name: 'bluered',
      colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
      positions: [0, .166, .333, .5, .666, .833, 1]
    } as ColorScheme;

    const { instance } = await shallow.render({ bind: { layers }});
    instance.updateLayerScheme(testScheme);
    expect(layers[1].colorScheme).toBe(testScheme);
    expect(layers[1].color).toBe(testScheme.colors[1]);
  });

  it('should not update the layer scheme if the layer has been customized', async () => {
    const layers = getTestLayers();
    const testScheme = {
      type: 'discrete',
      name: 'bluered',
      colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
      positions: [0, .166, .333, .5, .666, .833, 1]
    } as ColorScheme;

    const customScheme = {
      type: 'gradient',
      name: 'viridis',
      colors: ['#FFE31C', '#21908A', '#450B57'],
      positions: [0, .5, 1]
    } as ColorScheme;

    const { instance } = await shallow.render({ bind: { layers }});
    layers[1].customizedColor = true;
    instance.updateLayerScheme(testScheme);
    expect(layers[1].colorScheme).toEqual(customScheme);
    expect(layers[1].color).toBe('#21908A');
  });


});
