import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TissuesBrowserGridItemModule } from '../tissues-browser-grid-item/tissues-browser-grid-item.module';
import { TissuesBrowserGridComponent } from './tissues-browser-grid.component';

@NgModule({
  imports: [
    CommonModule,
    TissuesBrowserGridItemModule
  ],
  declarations: [
    TissuesBrowserGridComponent
  ],
  exports: [
    TissuesBrowserGridComponent
  ]
})
export class TissuesBrowserGridModule { }
