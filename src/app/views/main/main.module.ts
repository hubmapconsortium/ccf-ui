import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { HeaderModule } from '../../components/header/header.module';
import { NavigationModule } from '../../components/navigation/navigation.module';
import { SearchModule } from '../../components/search/search.module';
import { MainComponent } from './main.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    SearchModule,
    NavigationModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class MainModule { }
