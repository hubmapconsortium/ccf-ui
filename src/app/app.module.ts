import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './views/main/main.module';
import { AppStateModule } from './app-state.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRoutingModule,
    AppStateModule,
    MainModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
