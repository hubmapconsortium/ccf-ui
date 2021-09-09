import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsListComponent } from './stats-list.component';



@NgModule({
  declarations: [
    StatsListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ StatsListComponent ]
})
export class StatsListModule { }
