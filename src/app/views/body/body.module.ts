import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BodyRoutingModule } from './body-routing.module';
import { BodyComponent } from './body.component';

@NgModule({
  imports: [
    CommonModule,
    BodyRoutingModule
  ],
  declarations: [
    BodyComponent
  ]
})
export class BodyModule { }
