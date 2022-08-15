import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { TissueBlockListComponent } from './tissue-block-list.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [TissueBlockListComponent],
  exports: [TissueBlockListComponent]
})
export class TissueBlockListModule { }
