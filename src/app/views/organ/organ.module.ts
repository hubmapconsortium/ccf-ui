import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MetadataModule } from 'src/app/components/metadata/metadata.module';
import { OrganDataService } from 'src/app/shared/services/organ-data/organ-data.service';

import { OrganRoutingModule } from './organ-routing.module';
import { OrganComponent } from './organ.component';

@NgModule({
  imports: [
    CommonModule,
    OrganRoutingModule,
    MetadataModule
  ],
  declarations: [
    OrganComponent
  ],
  providers: [OrganDataService]
})
export class OrganModule { }
