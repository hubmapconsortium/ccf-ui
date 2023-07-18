import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { HeaderComponent } from './header.component';



@NgModule({
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
