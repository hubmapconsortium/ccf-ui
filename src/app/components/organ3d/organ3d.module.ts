import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { Organ3dComponent } from '../organ3d/organ3d.component';

@NgModule({
  imports: [
    CommonModule,
    NgxMapboxGLModule
  ],
  declarations: [Organ3dComponent],
  exports: [Organ3dComponent]
})
export class Organ3dModule { }
