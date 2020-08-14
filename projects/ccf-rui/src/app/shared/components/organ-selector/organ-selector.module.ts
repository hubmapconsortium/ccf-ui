import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganSelectorComponent } from './organ-selector.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [OrganSelectorComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [OrganSelectorComponent]
})
export class OrganSelectorModule { }
