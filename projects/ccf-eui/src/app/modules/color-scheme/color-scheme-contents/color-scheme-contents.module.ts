import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';

import { ColorSchemeContentsComponent } from './color-scheme-contents.component';
import { DualSliderModule } from '../../../shared/components/dual-slider/dual-slider.module';
import { ColorBarModule } from '../color-bar/color-bar.module';


@NgModule({
  imports: [CommonModule, DualSliderModule, Ng5SliderModule, ColorBarModule],
  declarations: [ColorSchemeContentsComponent],
  exports: [ColorSchemeContentsComponent]
})

export class ColorSchemeContentsModule { }
