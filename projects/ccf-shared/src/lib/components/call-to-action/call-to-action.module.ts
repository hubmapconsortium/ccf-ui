import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CallToActionComponent } from './call-to-action.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CallToActionComponent],
  imports: [CommonModule, MatIconModule, MatCardModule],
  exports: [CallToActionComponent]
})
export class CallToActionModule {}

