import { createCustomElement } from '@angular/elements';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyUiModule, InfoButtonModule, OrganSelectorModule, TrackingPopupModule, INITIAL_TELEMETRY_SETTING } from 'ccf-shared';

import { DEFAULT_THEME } from '../app/core/services/theming/theming.service';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FiltersPopoverModule } from './modules/filters/filters-popover/filters-popover.module';
import { OntologyExplorationModule } from './modules/ontology-exploration/ontology-exploration.module';
import { ResultsBrowserModule } from './modules/results-browser/results-browser/results-browser.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { DualSliderModule } from './shared/components/dual-slider/dual-slider.module';
import { SpinnerOverlayModule } from './shared/components/spinner-overlay/spinner-overlay.module';
import { ViewerModule } from './shared/components/viewer/viewer.module';

import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    DrawerModule,
    FiltersPopoverModule,
    OntologyExplorationModule,
    MatIconModule,
    DualSliderModule,
    ResultsBrowserModule,
    SpinnerOverlayModule,
    BodyUiModule,
    OrganSelectorModule,
    InfoButtonModule,
    MatTooltipModule,
    ViewerModule,
    NgxGoogleAnalyticsModule.forRoot(INITIAL_TELEMETRY_SETTING === false ? '' : environment.googleAnalyticsToken),
    TrackingPopupModule,
    MatSnackBarModule
  ],
  declarations: [AppComponent],
  providers: [{provide: DEFAULT_THEME, useValue: 'light-theme'}],
  entryComponents: [AppComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const appElement = createCustomElement(AppComponent, {
      injector: this.injector
    });

    customElements.define('ccf-eui', appElement);
  }
}
