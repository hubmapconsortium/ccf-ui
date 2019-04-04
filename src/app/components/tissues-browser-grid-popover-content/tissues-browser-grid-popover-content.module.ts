import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { TissuesBrowserGridPopoverContentComponent } from './tissues-browser-grid-popover-content.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [
    TissuesBrowserGridPopoverContentComponent
  ],
  exports: [
    TissuesBrowserGridPopoverContentComponent
  ]
})
export class TissuesBrowserGridPopoverContentModule { }
