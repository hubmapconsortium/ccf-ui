import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';
import { OrganSelectorModule } from '../../shared/components/organ-selector/organ-selector.module';


@NgModule({
  imports: [CommonModule, OrganSelectorModule],
  declarations: [LeftSidebarComponent],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
