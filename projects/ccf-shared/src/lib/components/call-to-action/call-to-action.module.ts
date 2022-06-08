import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CallToActionComponent } from './call-to-action.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CallToActionComponent],
  imports: [CommonModule, MatIconModule, HttpClientModule, MatDialogModule, MatCardModule],
  exports: [CallToActionComponent]
})
export class CallToActionModule {}

