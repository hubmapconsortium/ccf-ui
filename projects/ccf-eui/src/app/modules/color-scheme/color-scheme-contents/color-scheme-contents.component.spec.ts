import { Shallow } from 'shallow-render';

import { DEFAULT_COLOR_SCHEMES } from '../color-schemes';
import { ColorSchemeContentsComponent } from './color-scheme-contents.component';
import { ColorSchemeContentsModule } from './color-scheme-contents.module';
import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';
import { ColorScheme } from '../../../core/models/color-scheme';

function getTestLayers(): ImageViewerLayer {
  const layer = new ImageViewerLayer({
      selected: false,
      label: 'Option 1',
      id: '1',
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
    });
  return layer;
}

describe('ColorSchemeContentsComponent', () => {
  let shallow: Shallow<ColorSchemeContentsComponent>;

  beforeEach(() => {
    shallow = new Shallow(ColorSchemeContentsComponent, ColorSchemeContentsModule);
  });

  it('should emit the new layer when brightness is changed', async () => {
    const layer = getTestLayers();
    const schemeOptions = DEFAULT_COLOR_SCHEMES;
    const { instance, outputs } = await shallow.render({ bind: { schemeOptions, layer } });
    instance.brightnessChanged();
    expect(outputs.layerChange.emit).toHaveBeenCalled();
  });

  it('should emit the new layer when transparency is changed', async () => {
    const layer = getTestLayers();
    const schemeOptions = DEFAULT_COLOR_SCHEMES;
    const { instance, outputs } = await shallow.render({ bind: { schemeOptions, layer } });
    instance.transparencyChanged();
    expect(outputs.layerChange.emit).toHaveBeenCalled();
  });

  it('should update layer color and scheme and emit the new layer when colorChanged() is called', async () => {
    const layer = getTestLayers();
    const schemeOptions = DEFAULT_COLOR_SCHEMES;
    const { instance, outputs } = await shallow.render({ bind: { schemeOptions, layer } });
    instance.layer.color = 'blue';
    instance.layer.colorScheme = {
      type: 'discrete',
      name: 'bluered',
      colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
      positions: [0, .166, .333, .5, .666, .833, 1]
    };

    const testColorScheme: ColorScheme = {
      type: 'discrete',
      name: 'redblue',
      colors: ['red', 'black'],
      positions: [0, 1]
    };
    const testColor = 'red';
    const testLayer = new ImageViewerLayer({...instance.layer, colorScheme: testColorScheme, color: testColor, customizedColor: true });

    instance.colorChanged(testColor, testColorScheme);
    expect(outputs.layerChange.emit).toHaveBeenCalledWith(testLayer);
  });
});
