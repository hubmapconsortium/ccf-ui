import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { FiltersContentModule } from '../filters-content/filters-content.module';
import { FiltersPopoverComponent } from './filters-popover.component';


@NgModule({
  imports: [CommonModule, MatIconModule, FiltersContentModule],
  declarations: [FiltersPopoverComponent],
  exports: [FiltersPopoverComponent]
})
export class FiltersPopoverModule { }
