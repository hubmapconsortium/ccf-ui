import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewButtonComponent } from './review-button.component';
import { ReviewModalModule } from '../review-modal/review-modal.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ReviewButtonComponent],
  imports: [CommonModule, ReviewModalModule, MatButtonModule],
  exports: [ReviewButtonComponent]
})
export class ReviewButtonModule { }
