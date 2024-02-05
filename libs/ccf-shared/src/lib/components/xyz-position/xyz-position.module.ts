import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { XYZPositionComponent } from './xyz-position.component';


@NgModule({
  imports: [CommonModule],
  declarations: [XYZPositionComponent],
  exports: [XYZPositionComponent]
})
export class XYZPositionModule { }
