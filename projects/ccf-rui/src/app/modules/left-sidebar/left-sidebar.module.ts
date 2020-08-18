import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';
import { OrganSelectorModule } from '../../shared/components/organ-selector/organ-selector.module';
import { LabeledSlideToggleModule } from '../../shared/components/labeled-slide-toggle/labeled-slide-toggle.module';


@NgModule({
  declarations: [LeftSidebarComponent],
  imports: [CommonModule, OrganSelectorModule, LabeledSlideToggleModule],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
