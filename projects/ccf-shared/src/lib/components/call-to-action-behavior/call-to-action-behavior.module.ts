import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
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

