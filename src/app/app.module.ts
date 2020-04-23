import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FiltersPopoverModule } from './modules/filters/filters-popover/filters-popover.module';
import { InfoDialogModule } from './modules/info/info-dialog/info-dialog.module';
import { OntologyExplorationModule } from './modules/ontology-exploration/ontology-exploration.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { MatIconModule } from '@angular/material/icon';
import { DualSliderModule } from './shared/components/dual-slider/dual-slider.module';
import { ImageViewerPopoverModule } from './modules/image-viewer/image-viewer-popover/image-viewer-popover.module';
import { ImageViewerContentModule } from './modules/image-viewer/image-viewer-content/image-viewer-content.module';

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
    ImageViewerPopoverModule,
    ImageViewerContentModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
