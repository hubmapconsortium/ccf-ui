import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { CheckboxModule } from '../../../shared/components/checkbox/checkbox.module';
import { DropdownModule } from '../../../shared/components/dropdown/dropdown.module';
import { DualSliderModule } from '../../../shared/components/dual-slider/dual-slider.module';
import { FiltersContentComponent } from './filters-content.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, CheckboxModule, DropdownModule, DualSliderModule, MatButtonModule, MatIconModule],
  declarations: [FiltersContentComponent],
  exports: [FiltersContentComponent]
})
export class FiltersContentModule { }
