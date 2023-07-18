import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxsModule } from '@ngxs/store';

import { CallToActionModule } from '../call-to-action/call-to-action.module';
import { CallToActionBehaviorComponent } from './call-to-action-behavior.component';

@NgModule({
  declarations: [CallToActionBehaviorComponent],
  imports: [CommonModule, NgxsModule, MatIconModule, MatDialogModule, MatCardModule, CallToActionModule],
  exports: [CallToActionBehaviorComponent]
})
export class CallToActionBehaviorModule { }

