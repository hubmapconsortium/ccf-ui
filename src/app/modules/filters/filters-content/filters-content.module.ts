import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckboxModule } from '../../../shared/components/checkbox/checkbox.module';
import { DropdownModule } from '../../../shared/components/dropdown/dropdown.module';
import { SliderModule } from '../../../shared/components/slider/slider.module';
import { FiltersContentComponent } from './filters-content.component';


@NgModule({
  imports: [CommonModule, CheckboxModule, DropdownModule, SliderModule],
  declarations: [FiltersContentComponent],
  exports: [FiltersContentComponent]
})
export class FiltersContentModule { }
