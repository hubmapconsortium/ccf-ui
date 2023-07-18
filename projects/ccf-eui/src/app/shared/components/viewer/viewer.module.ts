import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';

import { ViewerComponent } from './viewer.component';



@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  declarations: [ViewerComponent],
  exports: [ViewerComponent]
})
export class ViewerModule { }
