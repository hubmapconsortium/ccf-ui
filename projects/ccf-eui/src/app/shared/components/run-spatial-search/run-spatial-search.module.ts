import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RunSpatialSearchComponent } from './run-spatial-search.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule],
  declarations: [RunSpatialSearchComponent],
  exports: [RunSpatialSearchComponent]
})
export class RunSpatialSearchModule { }
