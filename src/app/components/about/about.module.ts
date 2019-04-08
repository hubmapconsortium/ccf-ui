import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AboutComponent } from './about.component';
import { MatDialogModule } from '@angular/material';


/**
 * Module for the about modal.
 */
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule
  ],
  declarations: [
    AboutComponent
  ],
  exports: [ AboutComponent ]
})
export class AboutModule { }
