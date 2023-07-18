import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { TrackingPopupComponent } from './tracking-popup.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [TrackingPopupComponent],
  exports: [TrackingPopupComponent]
})
export class TrackingPopupModule { }
