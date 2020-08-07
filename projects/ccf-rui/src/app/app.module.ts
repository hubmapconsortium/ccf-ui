import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { StageNavModule } from './modules/stage-nav/stage-nav.module';
import { DEFAULT_THEME } from './core/services/theming/theming.service';


@NgModule({
  imports: [BrowserModule, CoreModule, StageNavModule],
  declarations: [AppComponent],
  providers: [{provide: DEFAULT_THEME, useValue: 'light-theme'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
