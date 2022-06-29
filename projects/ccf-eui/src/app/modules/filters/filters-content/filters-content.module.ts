import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SpatialSearchListModule } from 'ccf-shared';

import { CheckboxModule } from '../../../shared/components/checkbox/checkbox.module';
import { DropdownModule } from '../../../shared/components/dropdown/dropdown.module';
import { DualSliderModule } from '../../../shared/components/dual-slider/dual-slider.module';
import { RunSpatialSearchModule } from '../../../shared/components/run-spatial-search/run-spatial-search.module';
import { FiltersContentComponent } from './filters-content.component';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,

    CheckboxModule,
    DropdownModule,
    DualSliderModule,
    SpatialSearchListModule,
    RunSpatialSearchModule
  ],
  declarations: [FiltersContentComponent],
  exports: [FiltersContentComponent]
})
export class FiltersContentModule { }
