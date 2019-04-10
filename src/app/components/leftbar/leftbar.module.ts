import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { LeftbarComponent } from './leftbar.component';


@NgModule({
  declarations: [
    LeftbarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    LeftbarComponent
  ]
})
export class LeftbarModule { }
