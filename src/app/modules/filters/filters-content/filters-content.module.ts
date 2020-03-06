import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckboxModule } from '../../../shared/components/checkbox/checkbox.module';
import { DropdownModule } from '../../../shared/components/dropdown/dropdown.module';
import { FiltersContentComponent } from './filters-content.component';


@NgModule({
  imports: [CommonModule, CheckboxModule, DropdownModule],
  declarations: [FiltersContentComponent],
  exports: [FiltersContentComponent]
})
export class FiltersContentModule { }
