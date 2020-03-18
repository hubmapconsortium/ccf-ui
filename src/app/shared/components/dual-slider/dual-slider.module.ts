import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Ng5SliderModule } from 'ng5-slider';

import { DualSliderComponent } from './dual-slider.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng5SliderModule
  ],
  declarations: [DualSliderComponent],
  exports: [DualSliderComponent]
})
export class DualSliderModule { }
