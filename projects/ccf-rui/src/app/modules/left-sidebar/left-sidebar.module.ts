import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';
import { SideSelectorModule } from '../../shared/components/side-selector/side-selector.module';
import { GenderSelectorModule } from '../../shared/components/gender-selector/gender-selector.module';
import { OrganSelectorModule } from '../../shared/components/organ-selector/organ-selector.module';
import { DetailsLabelModule } from '../../shared/components/details-label/details-label.module';


@NgModule({
  declarations: [LeftSidebarComponent],
  imports: [CommonModule, SideSelectorModule, GenderSelectorModule, OrganSelectorModule, DetailsLabelModule],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
