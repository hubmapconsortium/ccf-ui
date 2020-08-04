import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationSliderComponent } from './rotation-slider.component';

@NgModule({
  declarations: [RotationSliderComponent],
  imports: [
    CommonModule
  ],
  exports: [RotationSliderComponent]
})
export class RotationSliderModule { }
