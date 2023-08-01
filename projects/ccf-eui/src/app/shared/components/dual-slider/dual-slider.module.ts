import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
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
