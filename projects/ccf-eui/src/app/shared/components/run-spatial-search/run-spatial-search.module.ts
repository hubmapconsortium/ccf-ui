import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

import { RunSpatialSearchComponent } from './run-spatial-search.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [RunSpatialSearchComponent],
  exports: [RunSpatialSearchComponent]
})
export class RunSpatialSearchModule { }
