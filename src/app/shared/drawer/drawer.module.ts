import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContainerComponent } from './container/container.component';
import { ContentComponent } from './content/content.component';
import { DrawerComponent } from './drawer/drawer.component';


@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule],
  declarations: [ContainerComponent, ContentComponent, DrawerComponent],
  exports: [ContainerComponent, ContentComponent, DrawerComponent]
})
export class DrawerModule { }
