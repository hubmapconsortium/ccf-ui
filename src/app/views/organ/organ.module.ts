import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrganDataService } from 'src/app/shared/services/organ-data/organ-data.service';

import { OrganRoutingModule } from './organ-routing.module';
import { OrganComponent } from './organ.component';

@NgModule({
  imports: [
    CommonModule,
    OrganRoutingModule
  ],
  declarations: [
    OrganComponent
  ],
  providers: [OrganDataService]
})
export class OrganModule { }
