import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewButtonComponent } from './review-button.component';
import { ReviewModalModule } from '../review-modal/review-modal.module';

@NgModule({
  declarations: [ReviewButtonComponent],
  imports: [CommonModule, ReviewModalModule],
  exports: [ReviewButtonComponent]
})
export class ReviewButtonModule { }
