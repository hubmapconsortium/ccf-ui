import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpacitySliderComponent } from './opacity-slider.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OpacitySliderComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [OpacitySliderComponent]
})
export class OpacitySliderModule { }
