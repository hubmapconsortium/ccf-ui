import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';

import { ColorSchemeContentsComponent } from './color-scheme-contents.component';
import { DualSliderModule } from '../../../shared/components/dual-slider/dual-slider.module';


@NgModule({
  imports: [CommonModule, DualSliderModule, Ng5SliderModule],
  declarations: [ColorSchemeContentsComponent],
  exports: [ColorSchemeContentsComponent]
})

export class ColorSchemeContentsModule { }
