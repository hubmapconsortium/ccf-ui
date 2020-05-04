import { Shallow } from 'shallow-render';

import { ImageViewerPopoverComponent } from './image-viewer-popover.component';
import { ImageViewerPopoverModule } from './image-viewer-popover.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ImageViewerData } from 'ccf-database';

describe('ImageViewerPopoverComponent', () => {
  let shallow: Shallow<ImageViewerPopoverComponent>;

  const mockData: {
    '@id': string,
    '@type': 'ImageViewerData',
    id: string,
    label: string,
    organName: string,
    metadata: {label: string; value: string;}[]
  } = {
    '@id': '',
    '@type': 'ImageViewerData',
    id: '',
    label: '',
    organName: '',
    metadata: [{label: '', value: ''}]
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
});
