import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { CallToActionComponent } from './call-to-action.component';

@NgModule({
  declarations: [CallToActionComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule, MatCardModule],
  exports: [CallToActionComponent]
})
export class CallToActionModule { }

