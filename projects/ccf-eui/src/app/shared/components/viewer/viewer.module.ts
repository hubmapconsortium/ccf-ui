import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewerComponent } from './viewer.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [ViewerComponent],
  exports: [ViewerComponent]
})
export class ViewerModule { }
