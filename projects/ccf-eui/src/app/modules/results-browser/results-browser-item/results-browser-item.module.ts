import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsBrowserItemComponent } from './results-browser-item.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [ResultsBrowserItemComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [ResultsBrowserItemComponent]
})
export class ResultsBrowserItemModule { }
