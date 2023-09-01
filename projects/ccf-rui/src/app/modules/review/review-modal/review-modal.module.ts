import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewModalComponent } from './review-modal.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ReviewModalComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  exports: [ReviewModalComponent]
})
export class ReviewModalModule { }
