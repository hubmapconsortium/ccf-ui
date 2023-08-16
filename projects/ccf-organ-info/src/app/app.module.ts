import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { OrganModule } from './features/organ/organ.module';
import { LinkCardsModule } from './modules/link-cards/link-cards.module';
import { StatsListModule } from './modules/stats-list/stats-list.module';



@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    LinkCardsModule,
    StatsListModule,
    OrganModule
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: []
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) { }

  ngDoBootstrap(): void {
    const appElement = createCustomElement(AppWebComponent, {
      injector: this.injector
    });

    customElements.define('ccf-organ-info', appElement);
  }
}
