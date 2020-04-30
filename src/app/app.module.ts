import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FiltersPopoverModule } from './modules/filters/filters-popover/filters-popover.module';
import { ImageViewerModule } from './modules/image-viewer/image-viewer.module';
import { InfoDialogModule } from './modules/info/info-dialog/info-dialog.module';
import { OntologyExplorationModule } from './modules/ontology-exploration/ontology-exploration.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { DualSliderModule } from './shared/components/dual-slider/dual-slider.module';
import { SpinnerOverlayModule } from './shared/components/spinner-overlay/spinner-overlay.module';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    DrawerModule,
    FiltersPopoverModule,
    OntologyExplorationModule,
    InfoDialogModule,
    MatIconModule,
    DualSliderModule,
    SpinnerOverlayModule,
    ImageViewerModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
