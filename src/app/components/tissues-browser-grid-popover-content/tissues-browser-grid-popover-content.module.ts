import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TissuesBrowserGridPopoverContentComponent } from './tissues-browser-grid-popover-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TissuesBrowserGridPopoverContentComponent
  ],
  exports: [
    TissuesBrowserGridPopoverContentComponent
  ]
})
export class TissuesBrowserGridPopoverContentModule { }
