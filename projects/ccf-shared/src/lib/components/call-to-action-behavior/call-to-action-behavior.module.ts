import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { CallToActionBehaviorComponent } from './call-to-action-behavior.component';
import { CallToActionModule } from '../call-to-action/call-to-action.module';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [CallToActionBehaviorComponent],
  imports: [CommonModule, NgxsModule, MatIconModule, MatDialogModule, MatCardModule, CallToActionModule],
  exports: [CallToActionBehaviorComponent]
})
export class CallToActionBehaviorModule {}

