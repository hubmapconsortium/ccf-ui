import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ImageViewerLayersComponent } from './image-viewer-layers.component';
import { SchemeDropdownModule } from '../../scheme-dropdown/scheme-dropdown.module';
import { ColorPickerLauncherModule } from '../../color-scheme/color-picker-launcher/color-picker-launcher.module';


@NgModule({
  imports: [CommonModule, MatCheckboxModule, ColorPickerLauncherModule, SchemeDropdownModule],
  declarations: [ImageViewerLayersComponent],
  exports: [ImageViewerLayersComponent]
})
export class ImageViewerLayersModule { }
