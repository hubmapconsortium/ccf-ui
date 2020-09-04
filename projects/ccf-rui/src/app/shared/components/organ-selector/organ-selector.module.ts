import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganSelectorComponent } from './organ-selector.component';
import { MatIconModule } from '@angular/material/icon';

import { ToggleableTooltipModule } from '../toggleable-tooltip/toggleable-tooltip.module';

@NgModule({
  declarations: [OrganSelectorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ToggleableTooltipModule
  ],
  exports: [OrganSelectorComponent]
})
export class OrganSelectorModule { }
