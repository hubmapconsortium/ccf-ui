import { Shallow } from 'shallow-render';

import { ImageViewerPopoverComponent } from './image-viewer-popover.component';
import { ImageViewerPopoverModule } from './image-viewer-popover.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ImageViewerPopoverComponent', () => {
  let shallow: Shallow<ImageViewerPopoverComponent>;

  beforeEach(() => {
    shallow = new Shallow(ImageViewerPopoverComponent, ImageViewerPopoverModule)
      .replaceModule(BrowserAnimationsModule, NoopAnimationsModule);
  });

  it('should toggle viewer visibility when toggleViewerVisible is called', async () => {
    const { instance } = await shallow.render();
    instance.viewerVisible = false;

    instance.toggleViewerVisible();
    expect(instance.viewerVisible).toBe(true);

    instance.toggleViewerVisible();
    expect(instance.viewerVisible).toBe(false);
  });

  it('should set visibility to false when the viewer is closed', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.viewerVisible = true;
    instance.closeViewer();
    expect(instance.viewerVisible).toBe(false);
  });
});
