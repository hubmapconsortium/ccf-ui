import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CalloutModule } from '../../components/callout/callout.module';
import { MetadataModule } from '../../components/metadata/metadata.module';
import { OrganDataService } from '../../shared/services/organ-data/organ-data.service';
import { OrganRoutingModule } from './organ-routing.module';
import { OrganComponent } from './organ.component';

@NgModule({
  imports: [
    CommonModule,
    CalloutModule,
    MetadataModule,
    OrganRoutingModule
  ],
  declarations: [
    OrganComponent
  ],
  providers: [OrganDataService]
})
export class OrganModule { }
