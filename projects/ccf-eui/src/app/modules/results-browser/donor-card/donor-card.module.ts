import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonorCardComponent } from './donor-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [DonorCardComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  exports: [DonorCardComponent]
})
export class DonorCardModule { }
