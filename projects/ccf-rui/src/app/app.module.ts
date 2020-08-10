import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DEFAULT_THEME } from './core/services/theming/theming.service';
import { LeftSidebarModule } from './modules/left-sidebar/left-sidebar.module';
import { RightSidebarModule } from './modules/right-sidebar/right-sidebar.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';


@NgModule({
  imports: [BrowserModule, CoreModule, DrawerModule, LeftSidebarModule, RightSidebarModule],
  declarations: [AppComponent],
  providers: [{provide: DEFAULT_THEME, useValue: 'light-theme'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
