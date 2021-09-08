import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OrganModule } from './features/organ/organ.module';
import { LinkCardsModule } from './modules/link-cards/link-cards.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OrganModule,
    LinkCardsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
