import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BodyRoutingModule } from './body-routing.module';
import { BodyComponent } from './body.component';
import { BodyDataService } from '../../shared/services/body-data/body-data.service';
import { MetadataModule } from 'src/app/components/metadata/metadata.module';
import { CalloutModule } from 'src/app/components/callout/callout.module';

@NgModule({
  imports: [
    CommonModule,
    BodyRoutingModule,
    CalloutModule,
    MetadataModule
  ],
  declarations: [ BodyComponent ],
  providers: [ BodyDataService ]
})
export class BodyModule { }
