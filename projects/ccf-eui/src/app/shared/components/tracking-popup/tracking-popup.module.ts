import { CommonModule } from '@angular/common';
import { NgModule, HostBinding } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { TrackingPopupComponent } from './tracking-popup.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [TrackingPopupComponent],
  exports: [TrackingPopupComponent]
})
export class TrackingPopupModule {
  @HostBinding('class') readonly clsName = 'ccf-tracking-popup';

}