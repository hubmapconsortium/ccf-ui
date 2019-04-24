import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TissueSearchModule } from '../tissue-search/tissue-search.module';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    TissueSearchModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule { }
