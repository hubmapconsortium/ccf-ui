import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationSliderComponent } from './rotation-slider.component';

import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [RotationSliderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatRippleModule
  ],
  exports: [RotationSliderComponent]
})
export class RotationSliderModule { }
