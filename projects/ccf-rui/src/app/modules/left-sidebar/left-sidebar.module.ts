import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';
import { GenderSelectorModule } from '../../shared/components/gender-selector/gender-selector.module';


@NgModule({
  declarations: [LeftSidebarComponent],
  imports: [CommonModule, GenderSelectorModule],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
