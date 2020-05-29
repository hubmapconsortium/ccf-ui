import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImageViewerContentModule } from '../image-viewer-content/image-viewer-content.module';
import { ImageViewerPopoverComponent } from './image-viewer-popover.component';
import { ImageViewerLegendModule } from '../image-viewer-legend/image-viewer-legend.module';
import { DrawerModule } from '../../../shared/components/drawer/drawer.module';


@NgModule({
  imports: [CommonModule, ImageViewerContentModule, DrawerModule, ImageViewerLegendModule],
  declarations: [ImageViewerPopoverComponent],
  exports: [ImageViewerPopoverComponent]
})
export class ImageViewerPopoverModule {}
