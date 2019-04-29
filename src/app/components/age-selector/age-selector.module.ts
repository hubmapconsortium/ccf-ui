import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { Ng5SliderModule } from 'ng5-slider';

import { AgeSelectorComponent } from './age-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    OverlayModule,
    PortalModule,
    Ng5SliderModule
  ],
  declarations: [AgeSelectorComponent],
  exports: [AgeSelectorComponent]
})
export class AgeSelectorModule { }
