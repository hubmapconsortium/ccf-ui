import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewButtonComponent } from './review-button.component';
import { ReviewModalModule } from '../review-modal/review-modal.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

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
