import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TissuesBrowserGridModule } from '../../components/tissues-browser-grid/tissues-browser-grid.module';
import { TissuesBrowserRoutingModule } from './tissues-browser-routing.module';
import { TissuesBrowserComponent } from './tissues-browser.component';

@NgModule({
  imports: [
    CommonModule,
    TissuesBrowserRoutingModule,
    TissuesBrowserGridModule
  ],
  declarations: [
    TissuesBrowserComponent
  ]
})
export class TissuesBrowserModule { }
