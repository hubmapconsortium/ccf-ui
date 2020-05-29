import { NgModule } from '@angular/core';

import { ImageViewerPopoverModule } from './image-viewer-popover/image-viewer-popover.module';
import { ImageViewerContentModule } from './image-viewer-content/image-viewer-content.module';
import { ViewerModule } from './viewer/viewer.module';

@NgModule({
  imports: [ImageViewerPopoverModule, ImageViewerContentModule, ViewerModule],
  providers: [],
  declarations: [],
  exports: [ImageViewerPopoverModule, ImageViewerContentModule]
})
export class ImageViewerModule { }
