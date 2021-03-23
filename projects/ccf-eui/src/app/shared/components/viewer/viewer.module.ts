import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ViewerComponent } from './viewer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  imports: [CommonModule, MatIconModule, MatProgressSpinnerModule],
  declarations: [ViewerComponent],
  exports: [ViewerComponent]
})
export class ViewerModule { }
