import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { AboutIconComponent } from './icons/about-icon/about-icon.component';
import { LogoComponent } from './icons/logo/logo.component';
import { ToolbarComponent } from './toolbar.component';
import { AboutModule } from '../about/about.module';
import { AboutComponent } from '../about/about.component';

@NgModule({
  declarations: [ToolbarComponent, LogoComponent, AboutIconComponent],
  imports: [
    AboutModule,
    CommonModule,
    MatDialogModule
  ],
  exports: [ToolbarComponent],
  entryComponents: [ AboutComponent ]
})
export class ToolbarModule { }
