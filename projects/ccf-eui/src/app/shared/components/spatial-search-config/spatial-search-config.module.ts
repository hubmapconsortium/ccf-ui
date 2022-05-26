import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

import { SpatialSearchConfigComponent } from './spatial-search-config.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule
  ],
  declarations: [SpatialSearchConfigComponent],
  exports: [SpatialSearchConfigComponent]
})
export class SpatialSearchConfigModule { }
