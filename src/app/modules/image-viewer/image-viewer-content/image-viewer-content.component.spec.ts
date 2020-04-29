import { Shallow } from 'shallow-render';

import { ImageViewerContentComponent } from './image-viewer-content.component';
import { ImageViewerContentModule } from './image-viewer-content.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ImageViewerPopoverComponent', () => {
  let shallow: Shallow<ImageViewerContentComponent>;

  beforeEach(() => {
    shallow = new Shallow(ImageViewerContentComponent, ImageViewerContentModule);
  });

  it('should emit closeViewer when close() is called', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.close();

    expect(outputs.closeViewer.emit).toHaveBeenCalled();
  });
});
