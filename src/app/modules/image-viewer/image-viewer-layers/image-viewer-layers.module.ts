import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerLayersComponent } from './image-viewer-layers.component';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  imports: [CommonModule, MatCheckboxModule],
  declarations: [ImageViewerLayersComponent],
  exports: [ImageViewerLayersComponent]
})
export class ImageViewerLayersModule { }
