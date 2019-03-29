import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TissuesBrowserGridComponent } from './tissues-browser-grid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TissuesBrowserGridComponent
  ],
  exports: [
    TissuesBrowserGridComponent
  ]
})
export class TissuesBrowserGridModule { }
