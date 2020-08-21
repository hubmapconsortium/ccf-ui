import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';
import { NameInputModule } from '../../shared/components/name-input/name-input.module';
import { OrganSelectorModule } from '../../shared/components/organ-selector/organ-selector.module';
import { ExtractionSitesMenuModule } from '../../shared/components/extraction-sites-menu/extraction-sites-menu.module';
import { DetailsLabelModule } from '../../shared/components/details-label/details-label.module';
import { LabeledSlideToggleModule } from '../../shared/components/labeled-slide-toggle/labeled-slide-toggle.module';


@NgModule({
  declarations: [LeftSidebarComponent],
  imports: [CommonModule, NameInputModule, OrganSelectorModule, LabeledSlideToggleModule, DetailsLabelModule, ExtractionSitesMenuModule],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
