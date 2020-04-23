import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ImageViewerContentComponent } from './image-viewer-content.component';


@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [ImageViewerContentComponent],
  exports: [ImageViewerContentComponent]
})
export class ImageViewerContentModule { }
