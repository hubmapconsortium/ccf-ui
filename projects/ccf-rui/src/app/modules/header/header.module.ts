import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HeaderComponent } from './header.component';
import { InfoButtonModule } from '../info/info-button/info-button.module';


@NgModule({
  imports: [CommonModule, MatIconModule, MatTooltipModule, InfoButtonModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
