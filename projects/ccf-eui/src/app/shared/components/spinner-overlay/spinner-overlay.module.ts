import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

import { SpinnerOverlayComponent } from './spinner-overlay.component';


@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule],
  declarations: [SpinnerOverlayComponent],
  exports: [SpinnerOverlayComponent]
})
export class SpinnerOverlayModule { }
