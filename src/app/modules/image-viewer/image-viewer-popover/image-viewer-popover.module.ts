import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImageViewerContentModule } from '../image-viewer-content/image-viewer-content.module';
import { ImageViewerPopoverComponent } from './image-viewer-popover.component';


@NgModule({
  imports: [CommonModule, ImageViewerContentModule],
  declarations: [ImageViewerPopoverComponent],
  exports: [ImageViewerPopoverComponent]
})
export class ImageViewerPopoverModule { }
