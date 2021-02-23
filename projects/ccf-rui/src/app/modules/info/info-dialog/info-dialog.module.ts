import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoDialogComponent } from './info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [InfoDialogComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatExpansionModule, MarkdownModule.forRoot({})],
  exports: [InfoDialogComponent]
})
export class InfoDialogModule {}
