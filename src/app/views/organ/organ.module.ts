import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrganRoutingModule } from './organ-routing.module';
import { OrganComponent } from './organ.component';

@NgModule({
  imports: [
    CommonModule,
    OrganRoutingModule
  ],
  declarations: [
    OrganComponent
  ]
})
export class OrganModule { }
