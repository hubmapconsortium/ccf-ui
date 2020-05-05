import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ColorSchemePopupComponent } from './color-scheme-popup.component';


@NgModule({
  imports: [CommonModule],
  declarations: [ColorSchemePopupComponent],
  exports: [ColorSchemePopupComponent]
})

export class ColorSchemePopupModule { }
