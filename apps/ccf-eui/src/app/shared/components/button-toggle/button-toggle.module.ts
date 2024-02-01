import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonToggleComponent } from './button-toggle.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonToggleModule, MatTooltipModule],
  declarations: [ButtonToggleComponent],
  exports: [ButtonToggleComponent],
})
export class ButtonToggleModule {}
