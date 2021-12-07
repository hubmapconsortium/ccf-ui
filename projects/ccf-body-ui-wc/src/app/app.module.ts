import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppWebComponent } from './app-web-component.component';
import { StoreModule } from './core/store/store.module';

@NgModule({
  declarations: [
    AppComponent,
    AppWebComponent
  ],
  imports: [
    BrowserModule,
    StoreModule
  ],
  providers: [],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) { }

  ngDoBootstrap(): void {
    const appElement = createCustomElement(AppWebComponent, {
      injector: this.injector
    });

    customElements.define('ccf-body-ui-wc', appElement);
  }
}
