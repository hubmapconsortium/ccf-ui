import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BodyModule } from './modules/body/body.module';
import { FiltersPopoverModule } from './modules/filters/filters-popover/filters-popover.module';
import { OntologyExplorationModule } from './modules/ontology-exploration/ontology-exploration.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { DualSliderModule } from './shared/components/dual-slider/dual-slider.module';
import { ResultsBrowserModule } from './modules/results-browser/results-browser/results-browser.module';
import { SpinnerOverlayModule } from './shared/components/spinner-overlay/spinner-overlay.module';
import { OrganSelectorModule } from 'ccf-shared';

import { DEFAULT_THEME } from '../app/core/services/theming/theming.service';

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
    BodyModule,
    OrganSelectorModule
  ],
  declarations: [AppComponent],
  providers: [{provide: DEFAULT_THEME, useValue: 'light-theme'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
