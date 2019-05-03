import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { AboutComponent } from '../about/about.component';
import { AboutModule } from '../about/about.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    AboutModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  entryComponents: [
    AboutComponent
  ]
})
export class HeaderModule { }
