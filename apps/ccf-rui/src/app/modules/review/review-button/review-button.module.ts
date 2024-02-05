import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewButtonComponent } from './review-button.component';
import { ReviewModalModule } from '../review-modal/review-modal.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ReviewButtonComponent],
  imports: [
    CommonModule,
    ReviewModalModule,
    MatButtonModule,
    MatTooltipModule
  ],
  exports: [ReviewButtonComponent]
})
export class ReviewButtonModule { }
