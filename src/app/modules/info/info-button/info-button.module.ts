import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InfoButtonComponent } from './info-button.component';
import { InfoDialogModule } from '../info-dialog/info-dialog.module';

@NgModule({
  declarations: [InfoButtonComponent],
  imports: [CommonModule, InfoDialogModule, MatIconModule],
  exports: [InfoButtonComponent]
})
export class InfoButtonModule {}
