import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { SpatialSearchKeyboardUIComponent } from './spatial-search-keyboard-ui.component';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [SpatialSearchKeyboardUIComponent],
  exports: [SpatialSearchKeyboardUIComponent]
})
export class SpatialSearchKeyboardUIModule { }
