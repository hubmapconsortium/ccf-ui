import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

import { SpatialSearchConfigComponent } from './spatial-search-config.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    FormsModule
  ],
  declarations: [SpatialSearchConfigComponent],
  exports: [SpatialSearchConfigComponent]
})
export class SpatialSearchConfigModule { }
