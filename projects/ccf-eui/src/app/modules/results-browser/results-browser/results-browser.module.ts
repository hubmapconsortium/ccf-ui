import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsBrowserItemModule } from '../results-browser-item/results-browser-item.module';
import { ResultsBrowserComponent } from './results-browser.component';
import { DonorCardModule } from '../donor-card/donor-card.module';

import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [ResultsBrowserComponent],
  imports: [
    CommonModule,
    ResultsBrowserItemModule,
    ScrollingModule,
    DonorCardModule
  ],
  exports: [ResultsBrowserComponent]
})
export class ResultsBrowserModule { }
