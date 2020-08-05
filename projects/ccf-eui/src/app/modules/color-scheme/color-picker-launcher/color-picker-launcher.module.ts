import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerLauncherComponent } from './color-picker-launcher.component';
import { ColorSchemePopupModule } from '../color-scheme-popup/color-scheme-popup.module';


@NgModule({
  declarations: [ColorPickerLauncherComponent],
  imports: [CommonModule, ColorSchemePopupModule],
  exports: [ColorPickerLauncherComponent]
})
export class ColorPickerLauncherModule { }
