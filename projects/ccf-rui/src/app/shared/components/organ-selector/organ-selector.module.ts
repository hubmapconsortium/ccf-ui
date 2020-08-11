import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganSelectorComponent } from './organ-selector.component';

@NgModule({
  declarations: [OrganSelectorComponent],
  imports: [
    CommonModule
  ],
  exports: [OrganSelectorComponent]
})
export class OrganSelectorModule { }
