import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { StageNavModule } from './modules/stage-nav/stage-nav.module';

@NgModule({
  imports: [BrowserModule, CoreModule, StageNavModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
