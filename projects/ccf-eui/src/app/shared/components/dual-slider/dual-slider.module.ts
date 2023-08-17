import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { NgxSliderModule } from 'ngx-slider-v2';

import { DualSliderComponent } from './dual-slider.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    NgxSliderModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  declarations: [DualSliderComponent],
  exports: [DualSliderComponent]
})
export class DualSliderModule { }
