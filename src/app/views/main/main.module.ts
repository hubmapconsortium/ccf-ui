import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../../components/header/header.module';
import { NavigationModule } from '../../components/navigation/navigation.module';
import { SidenavModule } from '../../components/sidenav/sidenav.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    SidenavModule,
    NavigationModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class MainModule { }
