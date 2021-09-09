import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LinkCardsModule } from './modules/link-cards/link-cards.module';
import { StatsListModule } from './modules/stats-list/stats-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LinkCardsModule,
    StatsListModule
  ],
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
