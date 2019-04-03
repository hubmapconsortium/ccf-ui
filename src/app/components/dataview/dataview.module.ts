import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DataviewComponent } from './dataview.component';


@NgModule({
  declarations: [DataviewComponent],
  imports: [
    CommonModule,
  ],
  exports: [DataviewComponent]
})
export class DataviewModule { }
