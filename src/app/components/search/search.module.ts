import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgeSelectorModule } from '../age-selector/age-selector.module';
import { GenderSelectorModule } from '../gender-selector/gender-selector.module';
import { SearchComponent } from './search.component';


@NgModule({
  imports: [
    CommonModule,
    AgeSelectorModule,
    GenderSelectorModule
  ],
  declarations: [SearchComponent],
  exports: [SearchComponent]
})
export class SearchModule { }
