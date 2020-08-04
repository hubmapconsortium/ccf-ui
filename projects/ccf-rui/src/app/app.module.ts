import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RotationSliderModule } from './shared/components/rotation-slider/rotation-slider.module';

@NgModule({
  imports: [BrowserModule, CoreModule, RotationSliderModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
