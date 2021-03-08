import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { InfoButtonComponent } from './info-button.component';
import { HttpClientModule } from '@angular/common/http';
import { InfoDialogModule } from '../info-dialog/info-dialog.module';

@NgModule({
  declarations: [InfoButtonComponent],
  imports: [CommonModule, InfoDialogModule, MatIconModule, HttpClientModule],
  exports: [InfoButtonComponent]
})
export class InfoButtonModule {}
