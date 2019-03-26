import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TissueRoutingModule } from './tissue-routing.module';
import { TissueComponent } from './tissue.component';

@NgModule({
  imports: [
    CommonModule,
    TissueRoutingModule
  ],
  declarations: [
    TissueComponent
  ]
})
export class TissueModule { }
