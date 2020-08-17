import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';
import { OrganSelectorModule } from '../../shared/components/organ-selector/organ-selector.module';
import { DetailsLabelModule } from '../../shared/components/details-label/details-label.module';


@NgModule({
  imports: [CommonModule, OrganSelectorModule, DetailsLabelModule],
  declarations: [LeftSidebarComponent],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
