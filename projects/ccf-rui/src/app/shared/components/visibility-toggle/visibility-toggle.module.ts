import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityToggleComponent } from './visibility-toggle.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [VisibilityToggleComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ VisibilityToggleComponent ]
})
export class VisibilityToggleModule { }
