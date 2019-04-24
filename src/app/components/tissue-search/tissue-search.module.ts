import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

import { TissueSearchComponent } from './tissue-search.component';

@NgModule({
  declarations: [TissueSearchComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatTabsModule
  ],
  exports: [TissueSearchComponent]
})
export class TissueSearchModule { }
