import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from '../../components/toolbar/toolbar.module'

import { MainComponent } from './main.component';
import { DataviewModule } from 'src/app/components/dataview/dataview.module';
import { SidenavModule } from 'src/app/components/sidenav/sidenav.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    DataviewModule,
    SidenavModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
