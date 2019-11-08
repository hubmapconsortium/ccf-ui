import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRenderInitModule } from './app-render-init.module';
import { AppRoutingModule } from './app-routing.module';
import { AppStateModule } from './app-state.module';
import { AppComponent } from './app.component';
import { MainModule } from './views/main/main.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AppRenderInitModule,
    AppRoutingModule,
    AppStateModule,
    MainModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
