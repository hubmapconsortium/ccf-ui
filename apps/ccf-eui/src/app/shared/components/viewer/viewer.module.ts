import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ViewerComponent } from './viewer.component';



@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [ViewerComponent],
  exports: [ViewerComponent]
})
export class ViewerModule { }
