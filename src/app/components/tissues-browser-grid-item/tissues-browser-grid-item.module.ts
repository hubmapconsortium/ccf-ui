import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TissuesBrowserGridItemComponent } from './tissues-browser-grid-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TissuesBrowserGridItemComponent
  ],
  exports: [
    TissuesBrowserGridItemComponent
  ]
})
export class TissuesBrowserGridItemModule { }
