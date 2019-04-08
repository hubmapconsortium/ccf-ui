import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AboutComponent } from './about.component';


/**
 * Module for the about modal.
 */
@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [
    AboutComponent
  ],
  exports: [ AboutComponent ]
})
export class AboutModule { }
