import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsBrowserComponent } from './results-browser.component';
import { DonorCardModule } from '../donor-card/donor-card.module';


@NgModule({
  declarations: [ResultsBrowserComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    DonorCardModule
  ],
  exports: [ResultsBrowserComponent]
})
export class ResultsBrowserModule { }
