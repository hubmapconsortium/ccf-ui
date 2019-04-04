import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TissueDataService } from '../../shared/tissue-data/tissue-data.service';
import { TissueRoutingModule } from './tissue-routing.module';
import { TissueComponent } from './tissue.component';

@NgModule({
  imports: [
    CommonModule,
    TissueRoutingModule
  ],
  declarations: [
    TissueComponent
  ],
  providers: [ TissueDataService ]
})
export class TissueModule { }
