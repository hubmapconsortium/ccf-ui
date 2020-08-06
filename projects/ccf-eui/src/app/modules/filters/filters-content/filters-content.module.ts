import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckboxModule } from '../../../shared/components/checkbox/checkbox.module';
import { DropdownModule } from '../../../shared/components/dropdown/dropdown.module';
import { DualSliderModule } from '../../../shared/components/dual-slider/dual-slider.module';
import { FiltersContentComponent } from './filters-content.component';


@NgModule({
  imports: [CommonModule, CheckboxModule, DropdownModule, DualSliderModule],
  declarations: [FiltersContentComponent],
  exports: [FiltersContentComponent]
})
export class FiltersContentModule { }
