import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MESSAGE_SERVICE_CONFIG, MESSAGE_SERVICE_DEFAULT_CONFIG } from '../../services/message/message.service';
import { ContainerComponent } from './container/container.component';
import { ContentComponent } from './content/content.component';
import { DrawerComponent } from './drawer/drawer.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';


@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, MatIconModule],
  providers: [{
    provide: MESSAGE_SERVICE_CONFIG, useValue: MESSAGE_SERVICE_DEFAULT_CONFIG
  }],
  declarations: [ContainerComponent, ContentComponent, DrawerComponent, ToggleButtonComponent],
  exports: [ContainerComponent, ContentComponent, DrawerComponent, ToggleButtonComponent]
})
export class DrawerModule { }
