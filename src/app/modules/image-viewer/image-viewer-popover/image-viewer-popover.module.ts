import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DrawerModule } from '../../../shared/components/drawer/drawer.module';
import { ImageViewerContentModule } from '../image-viewer-content/image-viewer-content.module';
import { ImageViewerLegendModule } from '../image-viewer-legend/image-viewer-legend.module';
import { ViewerModule } from '../viewer/viewer.module';
import { ImageViewerPopoverComponent } from './image-viewer-popover.component';


@NgModule({
  imports: [CommonModule, ImageViewerContentModule, DrawerModule, ViewerModule, ImageViewerLegendModule],
  declarations: [ImageViewerPopoverComponent],
  exports: [ImageViewerPopoverComponent]
})
export class ImageViewerPopoverModule { }
