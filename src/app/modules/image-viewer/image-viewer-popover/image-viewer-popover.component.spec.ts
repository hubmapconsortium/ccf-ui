import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Shallow } from 'shallow-render';

import { ImageViewerPopoverComponent } from './image-viewer-popover.component';
import { ImageViewerPopoverModule } from './image-viewer-popover.module';
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
      } as ImageViewerLayer,
      {
          ...testLayerCommon,
          label: 'Option 3',
          id: 3,
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

describe('ImageViewerPopoverComponent', () => {
  let shallow: Shallow<ImageViewerPopoverComponent>;

  const mockData: {
    '@id': string,
    '@type': 'ImageViewerData',
    id: string,
    label: string,
    organName: string,
    metadata: { label: string; value: string; }[]
  } = {
    '@id': '',
    '@type': 'ImageViewerData',
    id: '',
    label: '',
    organName: '',
    metadata: [{ label: '', value: '' }]
  };

  beforeEach(() => {
    shallow = new Shallow(ImageViewerPopoverComponent, ImageViewerPopoverModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule);
  });

  it('should open the viewer when open() is called', async () => {
    const { instance } = await shallow.render();
    instance.viewerVisible = false;
    instance.open(mockData);
    expect(instance.viewerVisible).toBe(true);
  });

  it('should set visibility to false when the viewer is closed', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.viewerVisible = true;
    instance.close();
    expect(instance.viewerVisible).toBe(false);
  });

  it('should set layers to the layers object passed into layersChanged() whenever called', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.testLayers = [];
    const testLayers = getTestLayers();
    instance.layersChanged(testLayers);

    expect(instance.testLayers).toEqual(testLayers);
  });

  it('should set activeLayers to the return of getActiveLayers() everytime layersChanged is called', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.testLayers = [];
    instance.layersChanged(getTestLayers());
    const testActiveLayers = instance.getActiveLayers();

    expect(instance.activeLayers).toEqual(testActiveLayers);
  });

  it('should sort layers by selectionOrder before returning from getActiveLayers()', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.testLayers = getTestLayers();
    instance.testLayers[0].selected = true;
    instance.testLayers[0].selectionOrder = 2;
    instance.testLayers[1].selected = true;
    instance.testLayers[1].selectionOrder = 1;
    instance.testLayers[2].selected = true;
    instance.testLayers[2].selectionOrder = 3;

    expect(instance.getActiveLayers()[0]).toEqual(instance.testLayers[1]);
    expect(instance.getActiveLayers()[1]).toEqual(instance.testLayers[0]);
    expect(instance.getActiveLayers()[2]).toEqual(instance.testLayers[2]);
  });

  it('should filter out unselected layers before returning from getActiveLayers()', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.testLayers = getTestLayers();
    instance.testLayers[0].selected = false;
    instance.testLayers[0].selectionOrder = 2;
    instance.testLayers[1].selected = true;
    instance.testLayers[1].selectionOrder = 1;

    expect(instance.getActiveLayers().indexOf(instance.testLayers[0])).toBe(-1);
    expect(instance.getActiveLayers().indexOf(instance.testLayers[1])).toBeGreaterThan(-1);
  });
});
