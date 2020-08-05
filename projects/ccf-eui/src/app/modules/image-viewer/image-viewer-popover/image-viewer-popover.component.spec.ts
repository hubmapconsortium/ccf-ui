import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ImageViewerData, ListResult } from 'ccf-database';
import { Shallow } from 'shallow-render';

import { StoreModule } from '../../../core/store/store.module';
import { ImageViewerPopoverComponent } from './image-viewer-popover.component';
import { ImageViewerPopoverModule } from './image-viewer-popover.module';
import { ViewerState } from '../../../core/store/viewer/viewer.state';
import { of } from 'rxjs';


@NgModule({})
class EmptyModule {}

describe('ImageViewerPopoverComponent', () => {
  const mockData: ImageViewerData = {
    '@id': '',
    '@type': 'ImageViewerData',
    id: '',
    label: '',
    organName: '',
    metadata: [{ label: '', value: '' }]
  };

  const mockResults: ListResult = {
    '@id': '',
    '@type': 'ListResult',
    id: '',
    label: ''
  };

  let shallow: Shallow<ImageViewerPopoverComponent>;

  beforeEach(() => {
    shallow = new Shallow(ImageViewerPopoverComponent, ImageViewerPopoverModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule)
      .replaceModule(StoreModule, EmptyModule)
      .mock(ViewerState, {
        layers$: of(),
        activeLayers$: of(),
        createLayers: () => undefined,
        updateLayer: () => undefined,
        setDefaultScheme: () => undefined
      });
  });

  it('should open the viewer when open() is called', async () => {
    const { instance } = await shallow.render();
    instance.viewerVisible = false;
    instance.open(mockData, mockResults);
    expect(instance.viewerVisible).toBe(true);
  });

  it('should set visibility to false when the viewer is closed', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.viewerVisible = true;
    instance.close();
    expect(instance.viewerVisible).toBe(false);
  });
});
