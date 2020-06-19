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
    expect(outputs.layerChanged.emit).toHaveBeenCalled();
  });

  it('should call handleUnselect when checkboxOnChange() is called on a selected layer', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render({ bind: { layers } });
    layers[1].selected = true;
    const spy = spyOn(instance, 'handleUnselect');
    instance.checkboxOnChange(layers[1]);
    expect(spy).toHaveBeenCalled();
  });

  it('should reorder the color assignment array if a layer becomes customized', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render({ bind: { layers } });
    layers[0].customizedColor = true;
    const spy = spyOn(instance, 'reorderAssignment');
    instance.layerChange(layers[0], 0);
    expect(spy).toHaveBeenCalledWith(layers[0]);
  });

  it('should not reorder the color assignment array if a layer was not customized', async () => {
    const layers = getTestLayers();
    const { instance } = await shallow.render({ bind: { layers } });
    layers[0].customizedColor = false;
    const spy = spyOn(instance, 'reorderAssignment');
    instance.layerChange(layers[0], 0);
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
    instance.assignmentOrder = [4, 0, 1, 2, 3, 6];
    instance.reorderAssignment(layers[0]);
    expect(instance.assignmentOrder).toEqual([4, 2, 5, 1, 3, 6, 0]);
  });
});
