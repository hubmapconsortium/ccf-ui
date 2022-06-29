import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpatialSearchKeyboardUIModule } from '../spatial-search-keyboard-ui/spatial-search-keyboard-ui.module';
import { SpatialSearchKeyboardUIBehaviorComponent } from './spatial-search-keyboard-ui-behavior.component';

@NgModule({
  imports: [
    CommonModule,
    SpatialSearchKeyboardUIModule
  ],
  declarations: [SpatialSearchKeyboardUIBehaviorComponent],
  exports: [SpatialSearchKeyboardUIBehaviorComponent]
})
export class SpatialSearchKeyboardUIBehaviorModule { }
