import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AccordionModule } from '../../../shared/components/accordion/accordion.module';

import { ImageViewerContentComponent } from './image-viewer-content.component';


@NgModule({
  imports: [CommonModule, MatIconModule, AccordionModule],
  declarations: [ImageViewerContentComponent],
  exports: [ImageViewerContentComponent]
})
export class ImageViewerContentModule { }