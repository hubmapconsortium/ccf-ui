import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { VisibilityMenuComponent } from './visibility-menu.component';


@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [VisibilityMenuComponent],
  exports: [VisibilityMenuComponent]
})
export class VisibilityMenuModule { }
