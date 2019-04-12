import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { TissueDataService } from '../../shared/services/tissue-data/tissue-data.service';
import { TissueRoutingModule } from './tissue-routing.module';
import { TissueComponent } from './tissue.component';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    TissueRoutingModule
  ],
  declarations: [
    TissueComponent
  ],
  providers: [ TissueDataService ]
})
export class TissueModule { }
