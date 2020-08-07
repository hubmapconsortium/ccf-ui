import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DEFAULT_THEME } from './core/services/theming/theming.service';
import { RotationSliderModule } from './shared/components/rotation-slider/rotation-slider.module';
import { SlicesInputModule } from './shared/components/slices-input/slices-input.module';


@NgModule({
  imports: [BrowserModule, CoreModule, BrowserAnimationsModule, RotationSliderModule, SlicesInputModule],
  declarations: [AppComponent],
  providers: [{provide: DEFAULT_THEME, useValue: 'light-theme'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
