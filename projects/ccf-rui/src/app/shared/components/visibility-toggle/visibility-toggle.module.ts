import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityToggleComponent } from './visibility-toggle.component';

@NgModule({
  declarations: [VisibilityToggleComponent],
  imports: [
    CommonModule
  ],
  exports: [ VisibilityToggleComponent ]
})
export class VisibilityToggleModule { }
