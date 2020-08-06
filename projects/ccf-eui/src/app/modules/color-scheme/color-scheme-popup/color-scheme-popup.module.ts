import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorSchemePopupComponent } from './color-scheme-popup.component';
import { ColorSchemeContentsModule } from '../color-scheme-contents/color-scheme-contents.module';


@NgModule({
  imports: [CommonModule, ColorSchemeContentsModule],
  declarations: [ColorSchemePopupComponent],
  exports: [ColorSchemePopupComponent]
})

export class ColorSchemePopupModule { }
