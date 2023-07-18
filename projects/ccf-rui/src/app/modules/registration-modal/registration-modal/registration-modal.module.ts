import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationModalComponent } from './registration-modal.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { RegistrationContentModule } from '../registration-content/registration-content.module';

@NgModule({
  declarations: [RegistrationModalComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, RegistrationContentModule],
  exports: [RegistrationModalComponent]
})
export class RegistrationModalModule { }
