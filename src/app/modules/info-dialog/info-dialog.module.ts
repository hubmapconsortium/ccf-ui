import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoDialogComponent } from './info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [InfoDialogComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule],
  exports: [InfoDialogComponent]
})
export class InfoDialogModule {}
