import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoDialogComponent } from './info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { InfoPanelModule } from '../info-panel/info-panel.module';

@NgModule({
  declarations: [InfoDialogComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, InfoPanelModule],
  exports: [InfoDialogComponent]
})
export class InfoDialogModule {}
