/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { AnalyticsModule } from 'ccf-shared/analytics';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { OrganModule } from './features/organ/organ.module';
import { LinkCardsModule } from './modules/link-cards/link-cards.module';
import { StatsListModule } from './modules/stats-list/stats-list.module';


@NgModule({
  imports: [
    BrowserModule,
    LinkCardsModule,
    StatsListModule,
    OrganModule,

    AnalyticsModule.forRoot({
      gaToken: environment.googleAnalyticsToken,

      appName: 'organ-info',
      projectName: 'ccf',

      developmentMode: !environment.production
    })
  ],
  declarations: [AppComponent],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) { }

  ngDoBootstrap(): void {
    const appElement = createCustomElement(AppComponent, {
      injector: this.injector
    });

    customElements.define('ccf-organ-info', appElement);
  }
}
