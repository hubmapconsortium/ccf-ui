import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationSliderComponent } from './rotation-slider.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [RotationSliderComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [RotationSliderComponent]
})
export class RotationSliderModule { }
