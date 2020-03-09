import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Ng5SliderModule } from 'ng5-slider';

import { SliderComponent } from './slider.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    MatFormFieldModule,
    MatSelectModule,
    Ng5SliderModule
  ],
  declarations: [SliderComponent],
  exports: [SliderComponent]
})
export class SliderModule { }
