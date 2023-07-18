import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotationSliderComponent } from './rotation-slider.component';

import { MatIconModule } from '@angular/material/icon';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatRippleModule } from '@angular/material/core';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
  declarations: [RotationSliderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatSliderModule,
    MatRippleModule,
    MatTooltipModule
  ],
  exports: [RotationSliderComponent]
})
export class RotationSliderModule { }
