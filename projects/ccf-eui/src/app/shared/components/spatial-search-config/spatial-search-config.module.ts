import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

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
