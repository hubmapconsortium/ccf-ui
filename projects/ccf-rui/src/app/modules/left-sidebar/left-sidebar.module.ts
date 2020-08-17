import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';
import { SideSelectorModule } from '../../shared/components/side-selector/side-selector.module';
import { OrganSelectorModule } from '../../shared/components/organ-selector/organ-selector.module';
import { LabeledSideToggleModule } from '../../shared/components/labeled-side-toggle/labeled-side-toggle.module';


@NgModule({
  declarations: [LeftSidebarComponent],
  imports: [CommonModule, SideSelectorModule, OrganSelectorModule, LabeledSideToggleModule],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
