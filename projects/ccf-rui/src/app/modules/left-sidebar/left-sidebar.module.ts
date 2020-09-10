import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';
import { NameInputModule } from '../../shared/components/name-input/name-input.module';
import { OrganSelectorModule } from '../../shared/components/organ-selector/organ-selector.module';
import { VisibilityMenuModule } from '../../shared/components/visibility-menu/visibility-menu.module';
import { ExtractionSetDropdownModule } from '../../shared/components/extraction-set-dropdown/extraction-set-dropdown.module';
import { OpacitySliderModule } from '../../shared/components/opacity-slider/opacity-slider.module';
import { DetailsLabelModule } from '../../shared/components/details-label/details-label.module';
import { LabeledSlideToggleModule } from '../../shared/components/labeled-slide-toggle/labeled-slide-toggle.module';
import { VisibilityToggleModule } from '../../shared/components/visibility-toggle/visibility-toggle.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [LeftSidebarComponent],
  imports: [
    CommonModule,
    NameInputModule,
    OrganSelectorModule,
    LabeledSlideToggleModule,
    DetailsLabelModule,
    VisibilityToggleModule,
    ExtractionSetDropdownModule,
    OpacitySliderModule,
    DetailsLabelModule,
    VisibilityMenuModule,
    MatExpansionModule
  ],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
