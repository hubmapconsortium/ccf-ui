import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TissuesBrowserGridItemComponent } from './tissues-browser-grid-item.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TissuesBrowserGridItemComponent
  ],
  exports: [
    TissuesBrowserGridItemComponent
  ]
})
export class TissuesBrowserGridItemModule { }
