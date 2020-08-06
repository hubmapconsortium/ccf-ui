import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { ViewerComponent } from './viewer.component';


@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [ViewerComponent],
  exports: [ViewerComponent]
})
export class ViewerModule { }
