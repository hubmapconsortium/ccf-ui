import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataviewModule } from 'src/app/components/dataview/dataview.module';
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
    SidenavModule
  ],
  exports: [MainComponent]
})
export class MainModule { }
