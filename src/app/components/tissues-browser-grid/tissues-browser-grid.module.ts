import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverModule } from 'ngx-smart-popover';

import { TissuesBrowserGridItemModule } from '../tissues-browser-grid-item/tissues-browser-grid-item.module';
import {
  TissuesBrowserGridPopoverContentModule,
} from '../tissues-browser-grid-popover-content/tissues-browser-grid-popover-content.module';
import { TissuesBrowserGridComponent } from './tissues-browser-grid.component';

@NgModule({
  imports: [
    CommonModule,
    PopoverModule,
    TissuesBrowserGridItemModule,
    TissuesBrowserGridPopoverContentModule
  ],
  declarations: [
    TissuesBrowserGridComponent
  ],
  exports: [
    TissuesBrowserGridComponent
  ]
})
export class TissuesBrowserGridModule { }
