import { Shallow } from 'shallow-render';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';
import { ColorScheme } from '../../../modules/color-scheme/color-schemes';
import { ImageViewerLayersComponent } from './image-viewer-layers.component';
import { ImageViewerLayersModule } from './image-viewer-layers.module';
import { BLUERED, VIRIDIS } from '../../color-scheme/color-schemes';


type LayerArgs =
  Pick<ConstructorParameters<typeof ImageViewerLayer>[0], 'id'> &
  Partial<Omit<ConstructorParameters<typeof ImageViewerLayer>[0], 'id'>>;
function createLayer(data: LayerArgs): ImageViewerLayer {
  return new ImageViewerLayer({
    label: data.id,
    colorScheme: BLUERED,
    color: (data.colorScheme || BLUERED).colors[0],
    selected: false,
    brightness: [20, 60],
    transparency: 100,
    customizedColor: false,
    selectionOrder: 0,
    defaultOrder: -1,
    ...data
  });
}

function getTestLayers(): ImageViewerLayer[] {
  const layers: ImageViewerLayer[] = [
    createLayer({ id: '1' }),
    createLayer({ id: '2', colorScheme: VIRIDIS, color: VIRIDIS.colors[1] }),
    createLayer({ id: '3', colorScheme: VIRIDIS, color: 'red' })
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
    expect(outputs.layerChange.emit).toHaveBeenCalled();
  });
});
