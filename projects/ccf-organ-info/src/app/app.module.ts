import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OrganModule } from './features/organ/organ.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OrganModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
