import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerLayersComponent } from './image-viewer-layers.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImageViewerLayersComponent],
  exports: [ImageViewerLayersComponent]
})
export class ImageViewerLayersModule { }
