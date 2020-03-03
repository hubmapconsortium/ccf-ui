import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';


@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, DrawerModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
