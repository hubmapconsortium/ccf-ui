import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

import { ImageViewerAccordionComponent } from './image-viewer-accordion.component';
import { ImageViewerLayersModule } from '../image-viewer-layers/image-viewer-layers.module';


@NgModule({
  imports: [CommonModule, MatExpansionModule, ImageViewerLayersModule],
  declarations: [ImageViewerAccordionComponent],
  exports: [ImageViewerAccordionComponent]
})
export class ImageViewerAccordionModule { }
