import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DataviewModule } from 'src/app/components/dataview/dataview.module';
import { LeftbarModule } from 'src/app/components/leftbar/leftbar.module';
import { SidenavModule } from 'src/app/components/sidenav/sidenav.module';

import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    DataviewModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    SidenavModule,
    LeftbarModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
