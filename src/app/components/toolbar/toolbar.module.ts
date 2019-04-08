import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { AboutComponent } from '../about/about.component';
import { AboutModule } from '../about/about.module';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    AboutModule
  ],
  exports: [
    ToolbarComponent
  ],
  entryComponents: [
    AboutComponent
  ]
})
export class ToolbarModule { }
