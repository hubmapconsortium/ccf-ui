import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AgeSelectorModule } from '../age-selector/age-selector.module';
import { SearchCategoriesModule } from '../search-categories/search-categories.module';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    AgeSelectorModule,
    SearchCategoriesModule
  ],
  declarations: [SidenavComponent],
  exports: [SidenavComponent]
})
export class SidenavModule { }
