import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewModalComponent } from './review-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ReviewModalComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule],
  exports: [ReviewModalComponent]
})
export class ReviewModalModule { }
