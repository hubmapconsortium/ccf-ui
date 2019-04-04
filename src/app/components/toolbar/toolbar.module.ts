import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './toolbar.component';
import { LogoComponent } from './icons/logo/logo.component';
import { AboutIconComponent } from './icons/about-icon/about-icon.component';

@NgModule({
  declarations: [ToolbarComponent, LogoComponent, AboutIconComponent],
  imports: [
    CommonModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
