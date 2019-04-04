import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataviewComponent } from './dataview.component';


@NgModule({
  declarations: [DataviewComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [DataviewComponent]
})
export class DataviewModule { }
