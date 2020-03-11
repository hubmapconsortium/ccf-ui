import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoDialogComponent } from './info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [InfoDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [InfoDialogComponent]
})
export class InfoDialogModule { }
