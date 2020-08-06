import { NgModule } from '@angular/core';

import { ImageViewerContentModule } from './image-viewer-content/image-viewer-content.module';
import { ImageViewerLayersModule } from './image-viewer-layers/image-viewer-layers.module';
import { ImageViewerPopoverModule } from './image-viewer-popover/image-viewer-popover.module';
import { ViewerModule } from './viewer/viewer.module';


@NgModule({
  imports: [ImageViewerPopoverModule, ImageViewerContentModule, ViewerModule, ImageViewerLayersModule],
  providers: [],
  declarations: [],
  exports: [ImageViewerPopoverModule, ImageViewerContentModule, ImageViewerLayersModule]
})
export class ImageViewerModule { }
