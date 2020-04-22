import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImageViewerContentComponent } from './image-viewer-content.component';


@NgModule({
  imports: [CommonModule],
  declarations: [ImageViewerContentComponent],
  exports: [ImageViewerContentComponent]
})
export class ImageViewerContentModule { }
