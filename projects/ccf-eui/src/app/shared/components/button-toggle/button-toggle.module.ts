import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonToggleComponent } from './button-toggle.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';



@NgModule({
  imports: [CommonModule,MatIconModule,MatButtonToggleModule],
  declarations: [ButtonToggleComponent],
  exports: [ButtonToggleComponent]
})
export class ButtonToggleModule { }
