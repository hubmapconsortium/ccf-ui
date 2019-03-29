import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
