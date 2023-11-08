import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OpacitySliderModule } from 'ccf-shared';

import { ExtractionSetDropdownModule } from '../../shared/components/extraction-set-dropdown/extraction-set-dropdown.module';
import { NameInputModule } from '../../shared/components/name-input/name-input.module';
import { VisibilityMenuModule } from '../../shared/components/visibility-menu/visibility-menu.module';
import { VisibilityToggleModule } from '../../shared/components/visibility-toggle/visibility-toggle.module';
import { LeftSidebarComponent } from './left-sidebar.component';



@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,

    MatDividerModule,
    NameInputModule,
    VisibilityToggleModule,
    ExtractionSetDropdownModule,
    OpacitySliderModule,
    VisibilityMenuModule,
    VisibilityToggleModule
  ],
  declarations: [LeftSidebarComponent],
  exports: [LeftSidebarComponent]
})
export class LeftSidebarModule { }
