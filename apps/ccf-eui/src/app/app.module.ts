import { OverlayContainer } from '@angular/cdk/overlay';
import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyUiModule, InfoButtonModule, OrganSelectorModule, TrackingPopupModule } from 'ccf-shared';
import { AppRootOverlayContainer } from './core/services/app-root-overlay/app-root-overlay.service';

import { DEFAULT_THEME } from '../app/core/services/theming/theming.service';
import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FiltersPopoverModule } from './modules/filters/filters-popover/filters-popover.module';
import { OntologyExplorationModule } from './modules/ontology-exploration/ontology-exploration.module';
import { ResultsBrowserModule } from './modules/results-browser/results-browser/results-browser.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { DualSliderModule } from './shared/components/dual-slider/dual-slider.module';
import { RunSpatialSearchModule } from './shared/components/run-spatial-search/run-spatial-search.module';
import { SpinnerOverlayModule } from './shared/components/spinner-overlay/spinner-overlay.module';
import { ViewerModule } from './shared/components/viewer/viewer.module';
import { ButtonToggleComponent } from './shared/components/button-toggle/button-toggle.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ButtonToggleModule } from './shared/components/button-toggle/button-toggle.module';



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
    TrackingPopupModule,
    MatSnackBarModule,
    RunSpatialSearchModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    ButtonToggleModule
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [
    { provide: DEFAULT_THEME, useValue: 'hubmap-theme-light' },
    { provide: OverlayContainer, useExisting: AppRootOverlayContainer }
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) { }

  ngDoBootstrap(): void {
    const appElement = createCustomElement(AppWebComponent, {
      injector: this.injector
    });

    customElements.define('ccf-eui', appElement);
  }
}
