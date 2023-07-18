import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
