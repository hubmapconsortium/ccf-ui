import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibilityToggleComponent } from './visibility-toggle.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';

@NgModule({
  declarations: [VisibilityToggleComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatChipsModule
  ],
  exports: [ VisibilityToggleComponent ]
})
export class VisibilityToggleModule { }
