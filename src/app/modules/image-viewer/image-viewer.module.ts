import { NgModule } from '@angular/core';

import { ImageViewerPopoverModule } from './image-viewer-popover/image-viewer-popover.module';
import { ImageViewerContentModule } from './image-viewer-content/image-viewer-content.module';
import { ImageViewerLayersModule } from './image-viewer-layers/image-viewer-layers.module';

@NgModule({
  imports: [ImageViewerPopoverModule, ImageViewerContentModule, ImageViewerLayersModule],
  providers: [],
  declarations: [],
  exports: [ImageViewerPopoverModule, ImageViewerContentModule, ImageViewerLayersModule]
})
export class ImageViewerModule { }
