import { ImageViewerLayer } from './image-viewer-layer';

function getTestLayer(): ImageViewerLayer {
  return new ImageViewerLayer({
    selected: false,
    brightness: [20, 60],
    transparency: 100,
    customizedColor: false,
    selectionOrder: 0,
    defaultOrder: -1,
    label: 'Option 1',
    id: '1',
    colorScheme: {
      type: 'discrete',
      name: 'bluered',
      colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
      positions: [0, .166, .333, .5, .666, .833, 1]
    },
    color: '#2166AC',
  });
}

describe('ImageViewerLayer', () => {
  it('should generate the background text of a discrete colorScheme properly', async () => {
    const layer = getTestLayer();
    layer.colorScheme.type = 'discrete';
    layer.color = 'red';
    const backgroundTestString = layer.background;

    expect(backgroundTestString).toBe('red');
  });

  it('should generate the background text of a gradient colorScheme properly', async () => {
    const layer = getTestLayer();
    layer.colorScheme = {
      type: 'gradient',
      name: 'viridis',
      colors: ['#FFE31C', '#21908A', '#450B57'],
      positions: [0, .5, 1]
    };
    const backgroundTestString = layer.background;
    const correctBackgroundString = 'linear-gradient(to right, #FFE31C 0%, #21908A 50%, #450B57 100%)';

    expect(backgroundTestString).toBe(correctBackgroundString);
  });
});
