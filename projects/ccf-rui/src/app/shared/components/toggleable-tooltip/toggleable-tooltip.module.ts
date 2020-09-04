import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleableTooltipComponent } from './toggleable-tooltip.component';



@NgModule({
  declarations: [ToggleableTooltipComponent],
  imports: [
    CommonModule
  ],
  exports: [ToggleableTooltipComponent]
})
export class ToggleableTooltipModule { }
