import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationModalComponent } from './registration-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationContentModule } from './registration-content.module';

@NgModule({
  declarations: [RegistrationModalComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, RegistrationContentModule],
  exports: [RegistrationModalComponent]
})
export class RegistrationModalModule { }
