import { NgModule } from '@angular/core';

import { ImageViewerPopoverModule } from './image-viewer-popover/image-viewer-popover.module';
import { ImageViewerContentModule } from './image-viewer-content/image-viewer-content.module';

@NgModule({
  imports: [ImageViewerPopoverModule, ImageViewerContentModule],
  providers: [],
  declarations: [],
  exports: [ImageViewerPopoverModule, ImageViewerContentModule]
})
export class ImageViewerModule { }
