import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyUiComponent } from './body-ui.component';

@NgModule({
  declarations: [BodyUiComponent],
  imports: [
    CommonModule
  ],
  exports: [BodyUiComponent]
})
export class BodyUiModule { }
