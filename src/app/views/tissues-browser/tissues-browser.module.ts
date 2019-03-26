import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TissuesBrowserRoutingModule } from './tissues-browser-routing.module';
import { TissuesBrowserComponent } from './tissues-browser.component';

@NgModule({
  imports: [
    CommonModule,
    TissuesBrowserRoutingModule
  ],
  declarations: [
    TissuesBrowserComponent
  ]
})
export class TissuesBrowserModule { }
