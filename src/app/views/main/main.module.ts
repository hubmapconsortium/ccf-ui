import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { LeftbarModule } from '../../components/leftbar/leftbar.module';
import { SidenavModule } from '../../components/sidenav/sidenav.module';
import { ToolbarModule } from '../../components/toolbar/toolbar.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    SidenavModule,
    LeftbarModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class MainModule { }
