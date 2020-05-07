import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BodyUiModule } from './body-ui/body-ui.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BodyUiModule
  ],
  exports: [
    BodyUiModule
  ]
})
export class BodyModule { }
