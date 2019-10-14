import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MetadataModule } from 'src/app/components/metadata/metadata.module';

import { TissueDataService } from '../../shared/services/tissue-data/tissue-data.service';
import { TissueRoutingModule } from './tissue-routing.module';
import { TissueComponent } from './tissue.component';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatButtonToggleModule,

    MetadataModule,
    TissueRoutingModule,
  ],
  declarations: [
    TissueComponent
  ],
  providers: [ TissueDataService ]
})
export class TissueModule { }
