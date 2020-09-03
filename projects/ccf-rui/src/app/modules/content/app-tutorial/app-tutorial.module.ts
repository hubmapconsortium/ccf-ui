import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTutorialComponent } from './app-tutorial.component';

@NgModule({
  declarations: [ AppTutorialComponent] ,
  imports: [
    CommonModule
  ],
  exports: [ AppTutorialComponent ]
})
export class AppTutorialModule { }
