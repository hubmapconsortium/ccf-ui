import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';
import { OrganSelectorModule } from '../../shared/components/organ-selector/organ-selector.module';


@NgModule({
  declarations: [LeftSidebarComponent],
  imports: [CommonModule, OrganSelectorModule],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
