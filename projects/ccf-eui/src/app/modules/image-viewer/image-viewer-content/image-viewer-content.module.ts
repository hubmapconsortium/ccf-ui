import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ImageViewerAccordionModule } from '../image-viewer-accordion/image-viewer-accordion.module';
import { ImageViewerContentComponent } from './image-viewer-content.component';


@NgModule({
  imports: [CommonModule, MatIconModule, ImageViewerAccordionModule],
  declarations: [ImageViewerContentComponent],
  exports: [ImageViewerContentComponent]
})
export class ImageViewerContentModule { }
