import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BlockSizeInputModule } from './shared/block-size-input/block-size-input.module';

@NgModule({
  imports: [BrowserModule, CoreModule, BrowserAnimationsModule, BlockSizeInputModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
