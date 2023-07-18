import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganSelectorComponent } from './organ-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
  declarations: [OrganSelectorComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [OrganSelectorComponent]
})
export class OrganSelectorModule { }
