import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LeftSidebarComponent } from './left-sidebar.component';
import { NameInputModule } from '../../shared/components/name-input/name-input.module';
import { OrganSelectorModule } from '../../shared/components/organ-selector/organ-selector.module';
import { VisibilityMenuModule } from '../../shared/components/visibility-menu/visibility-menu.module';
import { DetailsLabelModule } from '../../shared/components/details-label/details-label.module';
import { LabeledSlideToggleModule } from '../../shared/components/labeled-slide-toggle/labeled-slide-toggle.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [LeftSidebarComponent],
  imports: [
    CommonModule,
    NameInputModule,
    OrganSelectorModule,
    LabeledSlideToggleModule,
    DetailsLabelModule,
    VisibilityMenuModule,
    MatExpansionModule
  ],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
