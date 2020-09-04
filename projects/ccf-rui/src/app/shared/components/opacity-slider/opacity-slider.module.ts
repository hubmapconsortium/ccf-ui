import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpacitySliderComponent } from './opacity-slider.component';
import { MatSliderModule } from '@angular/material/slider';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OpacitySliderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule
  ],
  exports: [OpacitySliderComponent]
})
export class OpacitySliderModule { }
