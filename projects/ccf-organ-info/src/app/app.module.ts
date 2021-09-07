import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnalyticsModule } from 'ccf-shared/analytics';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LinkCardsModule } from './modules/link-cards/link-cards.module';


@NgModule({
  imports: [
    BrowserModule,

    AnalyticsModule.forRoot({
      gaToken: environment.googleAnalyticsToken,

      appName: 'organ-info',
      projectName: 'ccf',

      developmentMode: !environment.production
    }),

    LinkCardsModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
