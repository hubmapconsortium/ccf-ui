import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsBrowserItemModule } from '../results-browser-item/results-browser-item.module';
import { ResultsBrowserComponent } from './results-browser.component';

import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [ResultsBrowserComponent],
  imports: [
    CommonModule,
    ResultsBrowserItemModule,
    ScrollingModule
  ],
  exports: [ResultsBrowserComponent]
})
export class ResultsBrowserModule { }
