import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';

import { CallToActionComponent } from './call-to-action.component';

@NgModule({
  declarations: [CallToActionComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule, MatCardModule],
  exports: [CallToActionComponent]
})
export class CallToActionModule { }

