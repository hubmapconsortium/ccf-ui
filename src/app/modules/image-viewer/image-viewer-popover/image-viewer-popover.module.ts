import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ImageViewerContentModule } from '../image-viewer-content/image-viewer-content.module';
import { ImageViewerPopoverComponent } from './image-viewer-popover.component';
import { DrawerModule } from '../../../shared/components/drawer/drawer.module';


@NgModule({
  imports: [CommonModule, MatIconModule, ImageViewerContentModule, DrawerModule],
  declarations: [ImageViewerPopoverComponent],
  exports: [ImageViewerPopoverComponent]
})
export class ImageViewerPopoverModule { }
