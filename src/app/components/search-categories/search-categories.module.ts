import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

import { SearchCategoriesComponent } from './search-categories.component';

@NgModule({
  declarations: [SearchCategoriesComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatTabsModule
  ],
  exports: [SearchCategoriesComponent]
})
export class SearchCategoriesModule { }
