import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ViewerComponent } from './viewer.component';


@NgModule({
  imports: [CommonModule],
  declarations: [ViewerComponent],
  exports: [ViewerComponent]
})
export class ViewerModule { }
