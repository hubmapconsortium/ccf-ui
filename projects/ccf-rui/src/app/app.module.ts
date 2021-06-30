import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DEFAULT_THEME } from './core/services/theming/theming.service';
import { ContentModule } from './modules/content/content.module';
import { HeaderModule } from './modules/header/header.module';
import { LeftSidebarModule } from './modules/left-sidebar/left-sidebar.module';
import { RightSidebarModule } from './modules/right-sidebar/right-sidebar.module';
import { DrawerModule } from './shared/components/drawer/drawer.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { OrganSelectorModule } from 'ccf-shared';
import { RegistrationModalModule } from './modules/registration-modal/registration-modal/registration-modal.module';

import { TrackingPopupModule, INITIAL_TELEMETRY_SETTING } from 'ccf-shared';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../environments/environment.prod';

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
    OrganSelectorModule,
    RegistrationModalModule,
    NgxGoogleAnalyticsModule.forRoot(INITIAL_TELEMETRY_SETTING === false ? '' : environment.googleAnalyticsToken),
    TrackingPopupModule,
    MatSnackBarModule
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: DEFAULT_THEME,
      useValue: 'light-theme'
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard',
        floatLabel: false,
        hideRequiredMarker: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
