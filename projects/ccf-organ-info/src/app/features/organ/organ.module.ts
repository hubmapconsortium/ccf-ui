import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganComponent } from './organ.component';

import { BodyUiModule } from 'ccf-shared';


@NgModule({
  declarations: [
    OrganComponent
  ],
  imports: [
    CommonModule,
    BodyUiModule
  ],
  exports: [
    OrganComponent
  ]
})
export class OrganModule { }
