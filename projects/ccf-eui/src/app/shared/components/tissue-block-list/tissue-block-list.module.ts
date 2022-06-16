import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { TissueBlockListComponent } from './tissue-block-list.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  declarations: [TissueBlockListComponent],
  exports: [TissueBlockListComponent]
})
export class TissueBlockListModule { }
