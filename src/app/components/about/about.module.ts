import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [
    AboutComponent
  ],
  exports: [AboutComponent]
})
export class AboutModule { }
