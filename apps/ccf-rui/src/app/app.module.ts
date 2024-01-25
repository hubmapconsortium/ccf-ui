import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrackingPopupModule } from 'ccf-shared';

import { AppWebComponent } from './app-web-component.component';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DEFAULT_THEME } from './core/services/theming/theming.service';
import { ContentModule } from './modules/content/content.module';
import { HeaderModule } from './modules/header/header.module';
import { LeftSidebarModule } from './modules/left-sidebar/left-sidebar.module';
import { RegistrationModalModule } from './modules/registration-modal/registration-modal/registration-modal.module';
import { RightSidebarModule } from './modules/right-sidebar/right-sidebar.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MatIconModule,
    DrawerModule,
    HeaderModule,
    ContentModule,
    LeftSidebarModule,
    RightSidebarModule,
    RegistrationModalModule,
    TrackingPopupModule,
    MatSnackBarModule
  ],
  declarations: [AppComponent, AppWebComponent],
  providers: [
    {
      provide: DEFAULT_THEME,
      useValue: 'hubmap-theme-light'
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        floatLabel: true
      }
    }
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private readonly injector: Injector) { }

  ngDoBootstrap(): void {
    const appElement = createCustomElement(AppWebComponent, {
      injector: this.injector
    });

    customElements.define('ccf-rui', appElement);
  }
}
